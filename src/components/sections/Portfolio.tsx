import { featuredWork } from "@/data/featuredWork";
import { PortfolioRow } from "@/components/portfolio/PortfolioRow";
import "@/components/portfolio/portfolio.css";

const midpoint = Math.ceil(featuredWork.length / 2);
const upperProjects = featuredWork.slice(0, midpoint);
const lowerProjects = featuredWork.slice(midpoint);

export function Portfolio() {
  return (
    <section id="work" className="featured-work" aria-labelledby="featured-work-title">
      <div className="fw-heading">
        <div>
          <p className="fw-eyebrow">Featured Work / 03</p>
          <h2 id="featured-work-title">Selected <span>projects</span></h2>
        </div>
        <div className="fw-heading__aside">
          <p>Creative work for<br />forward-thinking brands.</p>
        </div>
      </div>
      <div className="fw-rows">
        <PortfolioRow
          projects={upperProjects}
          direction="right"
          number="01"
          automatic
        />
        <PortfolioRow
          projects={lowerProjects}
          direction="left"
          number="02"
          automatic
        />
      </div>
    </section>
  );
}
