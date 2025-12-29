// src/utils/pdfGenerator.ts
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Génère un PDF à partir d'un élément HTML
 * @param elementId - L'ID de l'élément HTML à convertir en PDF
 * @param fileName - Le nom du fichier PDF à télécharger
 */
export const generatePDFFromElement = async (
  elementId: string,
  fileName: string = 'CV.pdf'
): Promise<void> => {
  try {
    const element = document.getElementById(elementId);
    
    if (!element) {
      console.error(`Element with id "${elementId}" not found`);
      return;
    }

    // Scroll vers l'élément pour s'assurer qu'il est visible
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Petit délai pour laisser le scroll se terminer
    await new Promise(resolve => setTimeout(resolve, 300));

    // Créer un canvas à partir de l'élément HTML
    const canvas = await html2canvas(element, {
      scale: 2, // Meilleure qualité
      useCORS: true, // Pour les images externes
      logging: false,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');
    
    // Dimensions du PDF (A4)
    const pdfWidth = 210; // mm
    const pdfHeight = 297; // mm
    
    // Calculer les dimensions de l'image pour le PDF
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;
    
    // Créer le PDF
    const pdf = new jsPDF({
      orientation: imgHeight > pdfWidth ? 'portrait' : 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    let heightLeft = imgHeight;
    let position = 0;

    // Ajouter l'image au PDF
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    // Si le contenu dépasse une page, ajouter des pages supplémentaires
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    // Télécharger le PDF
    pdf.save(fileName);
    
    console.log('PDF généré avec succès');
  } catch (error) {
    console.error('Erreur lors de la génération du PDF:', error);
    throw error;
  }
};

/**
 * Génère un PDF du CV avec un nom personnalisé
 * @param name - Nom de la personne pour le nom du fichier
 */
export const downloadResumePDF = async (name: string = 'Portfolio'): Promise<void> => {
  const fileName = `CV_${name.replace(/\s+/g, '_')}_${new Date().getFullYear()}.pdf`;
  await generatePDFFromElement('resume-print-area', fileName);
};
