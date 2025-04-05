import type { Database } from "../../types/supabase";

type Product = Database["public"]["Tables"]["products"]["Row"];

// Simple text file generator instead of PDF to avoid memory issues
export const generateProductPDF = async (
  product: Product,
  language: "en" | "ar" = "en",
) => {
  try {
    const isRTL = language === "ar";

    // Create a simple text representation of the product
    let content = [];

    // Title
    content.push(
      `# ${isRTL && product.name_ar ? product.name_ar : product.name}`,
    );
    content.push("\n");

    // Description
    if ((isRTL && product.description_ar) || product.description) {
      content.push(
        isRTL && product.description_ar
          ? product.description_ar
          : product.description,
      );
      content.push("\n");
    }

    // Basic details
    content.push(
      `${isRTL ? "السعر:" : "Price:"} ${product.price?.toFixed(2) || "0.00"}`,
    );

    // Product Details
    content.push("\n");
    content.push(isRTL ? "## تفاصيل المنتج" : "## Product Details");

    if ((isRTL && product.features_ar) || product.features) {
      content.push(
        `${isRTL ? "المميزات:" : "Features:"} ${
          isRTL && product.features_ar ? product.features_ar : product.features
        }`,
      );
    }

    if ((isRTL && product.color_ar) || product.color) {
      content.push(
        `${isRTL ? "اللون:" : "Color:"} ${
          isRTL && product.color_ar ? product.color_ar : product.color
        }`,
      );
    }

    if ((isRTL && product.gloss_ar) || product.gloss) {
      content.push(
        `${isRTL ? "اللمعان:" : "Gloss:"} ${
          isRTL && product.gloss_ar ? product.gloss_ar : product.gloss
        }`,
      );
    }

    if ((isRTL && product.recommended_uses_ar) || product.recommended_uses) {
      content.push(
        `${isRTL ? "الاستخدامات الموصى بها:" : "Recommended Uses:"} ${
          isRTL && product.recommended_uses_ar
            ? product.recommended_uses_ar
            : product.recommended_uses
        }`,
      );
    }

    // Technical Specifications
    content.push("\n");
    content.push(isRTL ? "## المواصفات الفنية" : "## Technical Specifications");

    if ((isRTL && product.volume_solids_ar) || product.volume_solids) {
      content.push(
        `${isRTL ? "المواد الصلبة بالحجم:" : "Volume Solids:"} ${
          isRTL && product.volume_solids_ar
            ? product.volume_solids_ar
            : product.volume_solids
        }`,
      );
    }

    if ((isRTL && product.voc_ar) || product.voc) {
      content.push(
        `${isRTL ? "المركبات العضوية المتطايرة:" : "VOC:"} ${
          isRTL && product.voc_ar ? product.voc_ar : product.voc
        }`,
      );
    }

    if (
      (isRTL && product.theoretical_spreading_rate_ar) ||
      product.theoretical_spreading_rate
    ) {
      content.push(
        `${isRTL ? "معدل التغطية:" : "Spreading Rate:"} ${
          isRTL && product.theoretical_spreading_rate_ar
            ? product.theoretical_spreading_rate_ar
            : product.theoretical_spreading_rate
        } m²/L`,
      );
    }

    if ((isRTL && product.specific_gravity_ar) || product.specific_gravity) {
      content.push(
        `${isRTL ? "الكتلة النوعية:" : "Specific Gravity:"} ${
          isRTL && product.specific_gravity_ar
            ? product.specific_gravity_ar
            : product.specific_gravity
        }`,
      );
    }

    if ((isRTL && product.number_of_coats_ar) || product.number_of_coats) {
      content.push(
        `${isRTL ? "عدد الطبقات:" : "Number of Coats:"} ${
          isRTL && product.number_of_coats_ar
            ? product.number_of_coats_ar
            : product.number_of_coats
        }`,
      );
    }

    if ((isRTL && product.flexibility_ar) || product.flexibility) {
      content.push(
        `${isRTL ? "المرونة:" : "Flexibility:"} ${
          isRTL && product.flexibility_ar
            ? product.flexibility_ar
            : product.flexibility
        }`,
      );
    }

    if ((isRTL && product.adhesion_ar) || product.adhesion) {
      content.push(
        `${isRTL ? "الالتصاق:" : "Adhesion:"} ${
          isRTL && product.adhesion_ar ? product.adhesion_ar : product.adhesion
        }`,
      );
    }

    if ((isRTL && product.washability_ar) || product.washability) {
      content.push(
        `${isRTL ? "قابلية الغسل:" : "Washability:"} ${
          isRTL && product.washability_ar
            ? product.washability_ar
            : product.washability
        }`,
      );
    }

    if (
      (isRTL && product.abrasion_resistance_ar) ||
      product.abrasion_resistance
    ) {
      content.push(
        `${isRTL ? "مقاومة التآكل:" : "Abrasion Resistance:"} ${
          isRTL && product.abrasion_resistance_ar
            ? product.abrasion_resistance_ar
            : product.abrasion_resistance
        }`,
      );
    }

    if (
      (isRTL && product.recommended_film_thickness_ar) ||
      product.recommended_film_thickness
    ) {
      content.push(
        `${isRTL ? "سماكة الفيلم الموصى بها:" : "Recommended Film Thickness:"} ${
          isRTL && product.recommended_film_thickness_ar
            ? product.recommended_film_thickness_ar
            : product.recommended_film_thickness
        }`,
      );
    }

    if ((isRTL && product.water_resistance_ar) || product.water_resistance) {
      content.push(
        `${isRTL ? "مقاومة الماء:" : "Water Resistance:"} ${
          isRTL && product.water_resistance_ar
            ? product.water_resistance_ar
            : product.water_resistance
        }`,
      );
    }

    // Application Instructions
    content.push("\n");
    content.push(isRTL ? "## تعليمات التطبيق" : "## Application Instructions");

    if (
      (isRTL && product.method_of_application_ar) ||
      product.method_of_application
    ) {
      content.push(
        `${isRTL ? "طريقة التطبيق:" : "Application Method:"} ${
          isRTL && product.method_of_application_ar
            ? product.method_of_application_ar
            : product.method_of_application
        }`,
      );
    }

    if ((isRTL && product.mixing_ar) || product.mixing) {
      content.push(
        `${isRTL ? "تعليمات الخلط:" : "Mixing Instructions:"} ${
          isRTL && product.mixing_ar ? product.mixing_ar : product.mixing
        }`,
      );
    }

    if ((isRTL && product.thinner_ar) || product.thinner) {
      content.push(
        `${isRTL ? "المادة المخففة:" : "Thinner:"} ${
          isRTL && product.thinner_ar ? product.thinner_ar : product.thinner
        }`,
      );
    }

    if (
      (isRTL && product.application_temperatures_ar) ||
      product.application_temperatures
    ) {
      content.push(
        `${isRTL ? "درجات حرارة التطبيق:" : "Application Temperatures:"} ${
          isRTL && product.application_temperatures_ar
            ? product.application_temperatures_ar
            : product.application_temperatures
        }`,
      );
    }

    if ((isRTL && product.application_note_ar) || product.application_note) {
      content.push(
        `${isRTL ? "ملاحظات التطبيق:" : "Application Note:"} ${
          isRTL && product.application_note_ar
            ? product.application_note_ar
            : product.application_note
        }`,
      );
    }

    if (
      (isRTL && product.surface_preparation_ar) ||
      product.surface_preparation
    ) {
      content.push(
        `${isRTL ? "تحضير السطح:" : "Surface Preparation:"} ${
          isRTL && product.surface_preparation_ar
            ? product.surface_preparation_ar
            : product.surface_preparation
        }`,
      );
    }

    // Drying Time
    if (
      product.dry_to_touch ||
      product.dry_to_handle ||
      product.dry_to_topcoat ||
      product.complete_setting
    ) {
      content.push("\n");
      content.push(isRTL ? "## وقت الجفاف" : "## Drying Time");

      if ((isRTL && product.dry_to_touch_ar) || product.dry_to_touch) {
        content.push(
          `${isRTL ? "جاف للمس:" : "Dry to Touch:"} ${
            isRTL && product.dry_to_touch_ar
              ? product.dry_to_touch_ar
              : product.dry_to_touch
          }`,
        );
      }

      if ((isRTL && product.dry_to_handle_ar) || product.dry_to_handle) {
        content.push(
          `${isRTL ? "جاف للتداول:" : "Dry to Handle:"} ${
            isRTL && product.dry_to_handle_ar
              ? product.dry_to_handle_ar
              : product.dry_to_handle
          }`,
        );
      }

      if ((isRTL && product.dry_to_topcoat_ar) || product.dry_to_topcoat) {
        content.push(
          `${isRTL ? "جاف للطبقة التالية:" : "Dry to Topcoat:"} ${
            isRTL && product.dry_to_topcoat_ar
              ? product.dry_to_topcoat_ar
              : product.dry_to_topcoat
          }`,
        );
      }

      if ((isRTL && product.complete_setting_ar) || product.complete_setting) {
        content.push(
          `${isRTL ? "الجفاف الكامل:" : "Complete Setting:"} ${
            isRTL && product.complete_setting_ar
              ? product.complete_setting_ar
              : product.complete_setting
          }`,
        );
      }
    }

    // Storage and Safety
    content.push("\n");
    content.push(isRTL ? "## التخزين والسلامة" : "## Storage and Safety");

    if (
      (isRTL && product.storing_conditions_ar) ||
      product.storing_conditions
    ) {
      content.push(
        `${isRTL ? "ظروف التخزين:" : "Storage Conditions:"} ${
          isRTL && product.storing_conditions_ar
            ? product.storing_conditions_ar
            : product.storing_conditions
        }`,
      );
    }

    if ((isRTL && product.note_ar) || product.note) {
      content.push(
        `${isRTL ? "ملاحظة:" : "Note:"} ${
          isRTL && product.note_ar ? product.note_ar : product.note
        }`,
      );
    }

    if ((isRTL && product.notice_ar) || product.notice) {
      content.push(
        `${isRTL ? "ملاحظات السلامة:" : "Safety Notice:"} ${
          isRTL && product.notice_ar ? product.notice_ar : product.notice
        }`,
      );
    }

    // Footer
    content.push("\n");
    content.push(
      isRTL
        ? "تم إنشاؤه بواسطة ديكور بينت - للحصول على أحدث المعلومات، يرجى زيارة موقعنا على الإنترنت."
        : "Generated by Décor Paint - For the most up-to-date information, please visit our website.",
    );

    // Join all content with line breaks
    const textContent = content.join("\n");

    // Create a blob and download it as a text file
    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    const fileName = isRTL
      ? `${product.name_ar || product.name}-specifications-ar.txt`
          .toLowerCase()
          .replace(/\s+/g, "-")
      : `${product.name}-specifications-en.txt`
          .toLowerCase()
          .replace(/\s+/g, "-");

    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.style.display = "none";

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Clean up
    setTimeout(() => {
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    }, 100);

    return fileName;
  } catch (error) {
    console.error("Error generating text file:", error);
    throw error;
  }
};

// Function to generate and download text files in both languages
export const generateBilingualPDFs = async (product: Product) => {
  try {
    // Generate English text file
    const enFileName = await generateProductPDF(product, "en");

    // Generate Arabic text file
    const arFileName = await generateProductPDF(product, "ar");

    return { enFileName, arFileName };
  } catch (error) {
    console.error("Error generating text files:", error);
    throw error;
  }
};
