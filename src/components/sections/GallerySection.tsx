"use client";

import { useEffect, useState } from "react";
import { Media } from "@/components/ui/Media";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { stagger } from "@/components/motion/stagger";
import { galleryHref } from "@/lib/links";
import { kamgarApi } from "@/services/apiClient";
import { ImageOff, Loader2 } from "lucide-react";
import ui from "@/components/ui/ui.module.css";
import styles from "./sections.module.css";

interface GalleryCardItem {
  id: string;
  headline: string;
  image: string;
  category: string;
}

/** फोटो गैलरी: Exclusively loads from backend API (Galleries or Media Images) - Zero Dummy Data */
export function GallerySection() {
  const [items, setItems] = useState<GalleryCardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. First attempt to load published photo galleries
    kamgarApi
      .getPublicGalleries({ limit: 6 })
      .then((res) => {
        if (res?.galleries && res.galleries.length > 0) {
          const mapped: GalleryCardItem[] = res.galleries.map((g) => ({
            id: g.slug || g._id,
            headline: g.title,
            image: g.coverImage || (g.images?.[0]?.imageUrl ?? ""),
            category: g.category?.name || "फोटो गैलरी",
          }));
          setItems(mapped.filter((m) => Boolean(m.image)));
          setLoading(false);
          return;
        }

        // 2. If no galleries created yet, fetch admin published Media Images
        return kamgarApi.getMediaImages(1, 6).then((imgRes) => {
          if (imgRes?.images && imgRes.images.length > 0) {
            const mappedImgs: GalleryCardItem[] = imgRes.images.map((img) => ({
              id: img._id,
              headline: img.title || "फोटो गैलरी",
              image: img.url,
              category: "फोटो गैलरी",
            }));
            setItems(mappedImgs.filter((m) => Boolean(m.image)));
          } else {
            setItems([]);
          }
          setLoading(false);
        });
      })
      .catch(() => {
        // Fallback check on Media Images on network or API failure
        kamgarApi
          .getMediaImages(1, 6)
          .then((imgRes) => {
            if (imgRes?.images && imgRes.images.length > 0) {
              const mappedImgs: GalleryCardItem[] = imgRes.images.map((img) => ({
                id: img._id,
                headline: img.title || "फोटो गैलरी",
                image: img.url,
                category: "फोटो गैलरी",
              }));
              setItems(mappedImgs.filter((m) => Boolean(m.image)));
            } else {
              setItems([]);
            }
          })
          .catch(() => {
            setItems([]);
          })
          .finally(() => {
            setLoading(false);
          });
      });
  }, []);

  return (
    <section className={styles.section} aria-label="फोटो गैलरी">
      <div className="reveal">
        <SectionHeader title="फोटो गैलरी" href="/gallery" />
      </div>

      {loading && (
        <div className={styles.noDataLoading}>
          <Loader2 className="animate-spin" size={22} />
          <span>फोटो गैलरी लोड हो रही है...</span>
        </div>
      )}

      {!loading && items.length === 0 && (
        <div className={styles.noDataCard}>
          <ImageOff className={styles.noDataIcon} size={40} />
          <h4 className={styles.noDataTitle}>फोटो गैलरी उपलब्ध नहीं है</h4>
          <p className={styles.noDataDesc}>
            शीघ्र ही नई फोटो गैलरी यहाँ उपलब्ध होगी।
          </p>
        </div>
      )}

      {!loading && items.length > 0 && (
        <div className={styles.gallery}>
          {items.slice(0, 3).map((item, i) => (
            <a
              key={item.id}
              className={`${ui.overlay} ${styles.galleryItem}`}
              href={galleryHref(item.id)}
              aria-label={item.headline}
              style={stagger(i)}
            >
              <Media
                src={item.image}
                alt={item.headline}
                sizes="(max-width: 900px) 100vw, 33vw"
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
      )}
    </section>
  );
}
