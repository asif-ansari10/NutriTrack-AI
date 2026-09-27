export default function SectionHeading({eyebrow,title,description}:{eyebrow:string;title:string;description?:string}) {
  return <div className="mx-auto mb-12 max-w-3xl text-center">
    <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#00685f]">{eyebrow}</span>
    <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
    {description && <p className="mt-4 text-sm leading-6 text-[#3e4947] sm:text-base">{description}</p>}
  </div>;
}
