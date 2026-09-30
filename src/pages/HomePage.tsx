import {
  getAbout,
  getFeaturedProjects,
  getHome,
  getMoments,
  getProjectsByCategory,
  getSettings,
} from "../lib/content";
import { useSeo } from "../lib/seo";
import { AboutPreview } from "../components/home/AboutPreview";
import { CategorySection } from "../components/home/CategorySection";
import { ContactSection } from "../components/home/ContactSection";
import { Hero } from "../components/home/Hero";
import { MomentsPreview } from "../components/home/MomentsPreview";
import { SelectedWorks } from "../components/home/SelectedWorks";
import { Statement } from "../components/home/Statement";

export function HomePage() {
  const settings = getSettings();
  const home = getHome();
  const featured = getFeaturedProjects();
  const about = getAbout();
  const moments = getMoments();
  useSeo(settings.seoTitle, settings.seoDescription, settings.heroImage);

  return (
    <div id="work">
      <Hero settings={settings} scrollZh={home.scrollZh} scrollEn={home.scrollEn} />
      <SelectedWorks
        projects={featured}
        number={home.selectedNumber}
        zh={home.selectedZh}
        en={home.selectedEn}
        moreZh={home.selectedMoreZh}
        moreEn={home.selectedMoreEn}
      />
      {home.categories.map((meta, index) => (
        <div key={meta.id}>
          {index === 2 ? <Statement zh={home.statementZh} en={home.statementEn} /> : null}
          <CategorySection meta={meta} projects={getProjectsByCategory(meta.id, 4)} />
        </div>
      ))}
      <AboutPreview
        about={about}
        titleZh={home.aboutTitleZh}
        titleEn={home.aboutTitleEn}
        moreZh={home.aboutMoreZh}
        moreEn={home.aboutMoreEn}
      />
      <MomentsPreview
        moments={moments}
        titleZh={home.momentsTitleZh}
        titleEn={home.momentsTitleEn}
        note={home.momentsNote}
        moreZh={home.momentsMoreZh}
        moreEn={home.momentsMoreEn}
      />
      <ContactSection settings={settings} titleZh={home.contactTitleZh} titleEn={home.contactTitleEn} />
    </div>
  );
}
