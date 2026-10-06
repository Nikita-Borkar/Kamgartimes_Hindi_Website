import { gallery } from "@/data/news";
import { Media } from "@/components/ui/Media";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { stagger } from "@/components/motion/stagger";
import ui from "@/components/ui/ui.module.css";
import styles from "./sections.module.css";

/** फोटो गॅलरी: three tall overlays, no wire time. */
export function GallerySection() {
  return (
    <section className={styles.section} aria-label="फोटो गॅलरी">
      <div className="reveal">
        <SectionHeader title="फोटो गॅलरी" />
      </div>
      <div className={`${styles.gallery} reveal`}>
        {gallery.map((item, i) => (
          <a
            key={item.id}
            className={`${ui.overlay} ${styles.galleryItem} reveal`}
            href="#"
            aria-label={item.headline}
            style={stagger(i)}
          >
            <Media
              src={item.image}
              alt=""
              sizes="(max-width: 1100px) 100vw, 33vw"
              className={ui.overlayMedia}
            />
            <div className={ui.overlayBody}>
              <span className={ui.chip}>{item.category}</span>
              <h3 className={`${ui.overlayTitle} ${ui.titleM}`}>
                {item.headline}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
