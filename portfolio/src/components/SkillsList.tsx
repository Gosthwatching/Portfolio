import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import type { SkillGroup } from "../types/portfolio";
import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";
import * as LiaIcons from "react-icons/lia";
import * as MdIcons from "react-icons/md";
import * as TbIcons from "react-icons/tb";
import * as IoIcons from "react-icons/io";
import * as Io5Icons from "react-icons/io5";
import * as GiIcons from "react-icons/gi";
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import * as CgIcons from "react-icons/cg";
import * as HiIcons from "react-icons/hi";
import * as Hi2Icons from "react-icons/hi2";
import * as BiIcons from "react-icons/bi";
import * as ImIcons from "react-icons/im";
import * as VscIcons from "react-icons/vsc";
import * as SlIcons from "react-icons/sl";
import * as GrIcons from "react-icons/gr";
import * as FcIcons from "react-icons/fc";
import * as TfiIcons from "react-icons/tfi";
import * as PiIcons from "react-icons/pi";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";

export const SkillsList: React.FC<{
  skills?: SkillGroup[];
}> = ({ skills = [] }) => {
  const groupTitles = useMemo(
    () => skills.map((g) => g.title ?? "Other"),
    [skills]
  );

  const [selectedTitles, setSelectedTitles] = useState<(string)[]>([
    "all",
  ]);
  const [expanded, setExpanded] = useState(false);

  const contentRef = useRef<HTMLDivElement | null>(null);

  const toggleTitle = (title: string) => {
    if (title === "all") {
      setSelectedTitles(["all"]);
      return;
    }
    setSelectedTitles((prev) => {
      const withoutAll = prev.filter((t) => t !== "all");
      if (withoutAll.includes(title)) {
        const next = withoutAll.filter((t) => t !== title);
        return next.length === 0 ? ["all"] : next;
      }
      return [...withoutAll, title];
    });
  };

  const filteredGroups = useMemo(() => {
    if (selectedTitles.includes("all")) return skills;
    return skills.filter((g) => selectedTitles.includes(g.title ?? "Other"));
  }, [skills, selectedTitles]);

  const getCount = (title: string) => {
    if (title === "all") return skills.flatMap((g) => g.skills ?? []).length;
    const found = skills.find((g) => g.title === title);
    return found ? (found.skills ?? []).length : 0;
  };

  // collapse sizing
  const rowHeight = 140;
  const maxRowsCollapsed = 3;
  const collapsedPx = rowHeight * maxRowsCollapsed;
  const maxHeight = `${collapsedPx}px`;
  const totalSkillCount = skills.flatMap((g) => g.skills ?? []).length;

  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) {
      setHasOverflow(false);
      return;
    }
    const check = () => {
      setHasOverflow(el.scrollHeight > collapsedPx);
    };
    check();
    const ro = new ResizeObserver(() => check());
    ro.observe(el);
    const onResize = () => check();
    window.addEventListener("resize", onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [filteredGroups, collapsedPx, selectedTitles, totalSkillCount, expanded]);

  useEffect(() => setExpanded(false), [selectedTitles]);

  // If no overflow, collapsedHeightTarget is "auto" (so no empty space).
  const collapsedHeightTarget = hasOverflow ? maxHeight : "auto";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => toggleTitle("all")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggleTitle("all");
            }
          }}
          aria-pressed={selectedTitles.includes("all")}
          className={`px-3 py-1 rounded-full text-sm border transition select-none ${
            selectedTitles.includes("all")
              ? "bg-[var(--brand)] text-white border-[var(--brand)]"
              : "bg-[var(--surface)] text-[var(--text)] border-[var(--border)] hover:bg-[var(--border)]/30"
          }`}
        >
          All ({getCount("all")})
        </button>

        {groupTitles.map((t) => {
          const active = selectedTitles.includes(t);
          return (
            <button
              key={t}
              onClick={() => toggleTitle(t)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleTitle(t);
                }
              }}
              aria-pressed={active}
              className={`px-3 py-1 rounded-full text-sm border transition select-none ${
                active
                  ? "bg-[var(--brand)] text-white border-[var(--brand)]"
                  : "bg-[var(--surface)] text-[var(--text)] border-[var(--border)] hover:bg-[var(--border)]/30"
              }`}
            >
              {t} ({getCount(t)})
            </button>
          );
        })}
      </div>

      {/* key change: only force the collapsed maxHeight when hasOverflow === true.
          Otherwise use "auto" to avoid empty space. */}
      <motion.div
        animate={{ height: expanded ? "auto" : collapsedHeightTarget }}
        transition={{ duration: 0.45 }}
        className="overflow-hidden"
      >
        <motion.div
          key={selectedTitles.join("-")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="space-y-6"
          ref={contentRef}
        >
          {filteredGroups.map((group) => {
            const groupTitle = group.title ?? "Other";
            const groupSkills = group.skills ?? [];
            return (
              <section
                key={groupTitle}
                aria-labelledby={`skills-${groupTitle}`}
                className=""
              >
                <h3
                  id={`skills-${groupTitle}`}
                  className="text-sm font-semibold text-[var(--brand)] mb-3"
                >
                  {groupTitle}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  {groupSkills.map((s) => {
                    let Icon = null;
                    if (s.icon) {
                      if (s.icon.startsWith('Si')) Icon = SiIcons[s.icon as keyof typeof SiIcons];
                      else if (s.icon.startsWith('Fa6')) Icon = Fa6Icons[s.icon as keyof typeof Fa6Icons];
                      else if (s.icon.startsWith('Fa')) Icon = FaIcons[s.icon as keyof typeof FaIcons];
                      else if (s.icon.startsWith('Lia')) Icon = LiaIcons[s.icon as keyof typeof LiaIcons];
                      else if (s.icon.startsWith('Md')) Icon = MdIcons[s.icon as keyof typeof MdIcons];
                      else if (s.icon.startsWith('Tb')) Icon = TbIcons[s.icon as keyof typeof TbIcons];
                      else if (s.icon.startsWith('Io5')) Icon = Io5Icons[s.icon as keyof typeof Io5Icons];
                      else if (s.icon.startsWith('Io')) Icon = IoIcons[s.icon as keyof typeof IoIcons];
                      else if (s.icon.startsWith('Gi')) Icon = GiIcons[s.icon as keyof typeof GiIcons];
                      else if (s.icon.startsWith('Bs')) Icon = BsIcons[s.icon as keyof typeof BsIcons];
                      else if (s.icon.startsWith('Ai')) Icon = AiIcons[s.icon as keyof typeof AiIcons];
                      else if (s.icon.startsWith('Ri')) Icon = RiIcons[s.icon as keyof typeof RiIcons];
                      else if (s.icon.startsWith('Cg')) Icon = CgIcons[s.icon as keyof typeof CgIcons];
                      else if (s.icon.startsWith('Hi2')) Icon = Hi2Icons[s.icon as keyof typeof Hi2Icons];
                      else if (s.icon.startsWith('Hi')) Icon = HiIcons[s.icon as keyof typeof HiIcons];
                      else if (s.icon.startsWith('Bi')) Icon = BiIcons[s.icon as keyof typeof BiIcons];
                      else if (s.icon.startsWith('Im')) Icon = ImIcons[s.icon as keyof typeof ImIcons];
                      else if (s.icon.startsWith('Vsc')) Icon = VscIcons[s.icon as keyof typeof VscIcons];
                      else if (s.icon.startsWith('Sl')) Icon = SlIcons[s.icon as keyof typeof SlIcons];
                      else if (s.icon.startsWith('Gr')) Icon = GrIcons[s.icon as keyof typeof GrIcons];
                      else if (s.icon.startsWith('Fc')) Icon = FcIcons[s.icon as keyof typeof FcIcons];
                      else if (s.icon.startsWith('Tfi')) Icon = TfiIcons[s.icon as keyof typeof TfiIcons];
                      else if (s.icon.startsWith('Pi')) Icon = PiIcons[s.icon as keyof typeof PiIcons];
                    }
                    return (
                      <motion.fieldset
                        key={s.name}
                        whileHover={{ y: -6 }}
                        className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] transition duration-300 cursor-default text-[var(--muted)] hover:text-[var(--text)]"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="font-medium text-sm">{s.name}</div>
                                                        {s.description && (
                                                          <div className="text-xs text-gray-500 mt-1">
                                                            {s.description}
                                                          </div>
                                                        )}
                            <div className="text-xs text-slate-400 mt-1">
                              {s.years
                                ? `${s.years} yr${s.years > 1 ? "s" : ""}`
                                : null}
                              {s.note ? (
                                <span className="ml-2">• {s.note}</span>
                              ) : null}
                            </div>
                          </div>

                          {Icon ? (
                            <div className="flex items-center shrink-0">
                              <Icon className="w-6 h-6 text-[var(--muted)]" />
                            </div>
                          ) : s.icon && s.icon.startsWith('<svg') ? (
                            <span className="flex items-center shrink-0" dangerouslySetInnerHTML={{ __html: s.icon }} />
                          ) : s.icon && s.icon.startsWith('http') ? (
                            <img src={s.icon} alt={s.name} className="w-6 h-6 object-contain" />
                          ) : null}
                        </div>
                      </motion.fieldset>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </motion.div>
      </motion.div>

      {/* show expand control only when content actually overflows or when expanded */}
      {(hasOverflow || expanded) && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="flex items-center gap-2 px-3 py-2 rounded-full cursor-pointer border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--border)]/30 text-[var(--text)] transition"
            aria-expanded={expanded}
          >
            {expanded ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
            <span className="text-sm">
              {expanded ? "Show less" : "Show more"}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SkillsList;
