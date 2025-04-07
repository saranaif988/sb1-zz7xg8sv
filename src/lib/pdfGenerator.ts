import jsPDF from "jspdf";
import type { Database } from "../types/supabase";

type Product = Database["public"]["Tables"]["products"]["Row"];

export const generateProductPDF = (
  product: Product,
  language: string = "en",
) => {
  try {
    // Create a new PDF document
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Set RTL for Arabic language
    if (language === "ar") {
      doc.setR2L(true);
    }

    // Set font size and add title
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");

    // Add company logo/name at the top
    doc.setTextColor(35, 48, 84); // #233054 color
    doc.text("DÉCOR", 105, 20, { align: "center" });

    // Add horizontal line
    doc.setDrawColor(35, 48, 84);
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);

    // Product title
    doc.setTextColor(0, 0, 0);
    const productName =
      language === "ar" && product.name_ar ? product.name_ar : product.name;
    doc.text(productName, language === "ar" ? 170 : 20, 40);

    // Set font for body text
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    // Add product description
    const description =
      language === "ar" && product.description_ar
        ? product.description_ar
        : product.description;
    if (description) {
      const descLines = doc.splitTextToSize(description, 150);
      doc.text(descLines, language === "ar" ? 170 : 20, 50, {
        align: language === "ar" ? "right" : "left",
      });
    }

    let yPos = 70;

    // Add price
    const priceLabel = language === "ar" ? "السعر:" : "Price:";
    doc.setFont("helvetica", "bold");
    doc.text(priceLabel, language === "ar" ? 170 : 20, yPos);
    doc.setFont("helvetica", "normal");
    doc.text(
      `$${product.price.toFixed(2)}`,
      language === "ar" ? 150 : 50,
      yPos,
    );
    yPos += 10;

    // Product Details Section
    if (product.features || product.color || product.gloss) {
      yPos += 5;
      doc.setFont("helvetica", "bold");
      const detailsTitle =
        language === "ar" ? "تفاصيل المنتج:" : "Product Details:";
      doc.text(detailsTitle, language === "ar" ? 170 : 20, yPos);
      doc.setFont("helvetica", "normal");
      yPos += 7;

      if (product.features) {
        const featuresLabel = language === "ar" ? "المميزات:" : "Features:";
        doc.setFont("helvetica", "bold");
        doc.text(featuresLabel, language === "ar" ? 170 : 20, yPos);
        doc.setFont("helvetica", "normal");

        const features =
          language === "ar" && product.features_ar
            ? product.features_ar
            : product.features;
        const featureLines = doc.splitTextToSize(features, 150);
        doc.text(featureLines, language === "ar" ? 170 : 30, yPos + 7, {
          align: language === "ar" ? "right" : "left",
        });
        yPos += 7 + featureLines.length * 5;
      }

      if (product.color) {
        const colorLabel = language === "ar" ? "اللون:" : "Color:";
        doc.setFont("helvetica", "bold");
        doc.text(colorLabel, language === "ar" ? 170 : 20, yPos);
        doc.setFont("helvetica", "normal");

        const color =
          language === "ar" && product.color_ar
            ? product.color_ar
            : product.color;
        doc.text(color, language === "ar" ? 150 : 50, yPos);
        yPos += 7;
      }

      if (product.gloss) {
        const glossLabel = language === "ar" ? "اللمعان:" : "Gloss:";
        doc.setFont("helvetica", "bold");
        doc.text(glossLabel, language === "ar" ? 170 : 20, yPos);
        doc.setFont("helvetica", "normal");

        const gloss =
          language === "ar" && product.gloss_ar
            ? product.gloss_ar
            : product.gloss;
        doc.text(gloss, language === "ar" ? 150 : 50, yPos);
        yPos += 7;
      }
    }

    // Technical Specifications Section
    if (
      product.volume_solids ||
      product.voc ||
      product.theoretical_spreading_rate
    ) {
      yPos += 5;
      doc.setFont("helvetica", "bold");
      const techTitle =
        language === "ar" ? "المواصفات الفنية:" : "Technical Specifications:";
      doc.text(techTitle, language === "ar" ? 170 : 20, yPos);
      doc.setFont("helvetica", "normal");
      yPos += 7;

      if (product.volume_solids) {
        const vsLabel =
          language === "ar" ? "المواد الصلبة بالحجم:" : "Volume Solids:";
        doc.setFont("helvetica", "bold");
        doc.text(vsLabel, language === "ar" ? 170 : 20, yPos);
        doc.setFont("helvetica", "normal");

        const vs =
          language === "ar" && product.volume_solids_ar
            ? product.volume_solids_ar
            : product.volume_solids;
        doc.text(vs, language === "ar" ? 120 : 80, yPos);
        yPos += 7;
      }

      if (product.voc) {
        const vocLabel =
          language === "ar" ? "المركبات العضوية المتطايرة:" : "VOC:";
        doc.setFont("helvetica", "bold");
        doc.text(vocLabel, language === "ar" ? 170 : 20, yPos);
        doc.setFont("helvetica", "normal");

        const voc =
          language === "ar" && product.voc_ar ? product.voc_ar : product.voc;
        doc.text(voc, language === "ar" ? 120 : 80, yPos);
        yPos += 7;
      }

      if (product.theoretical_spreading_rate) {
        const tsrLabel =
          language === "ar" ? "معدل التغطية النظري:" : "Spreading Rate:";
        doc.setFont("helvetica", "bold");
        doc.text(tsrLabel, language === "ar" ? 170 : 20, yPos);
        doc.setFont("helvetica", "normal");

        const tsr =
          language === "ar" && product.theoretical_spreading_rate_ar
            ? `${product.theoretical_spreading_rate_ar} م²/ل`
            : `${product.theoretical_spreading_rate} m²/L`;
        doc.text(tsr, language === "ar" ? 120 : 80, yPos);
        yPos += 7;
      }
    }

    // Application Instructions Section
    if (product.method_of_application || product.mixing || product.thinner) {
      yPos += 5;
      doc.setFont("helvetica", "bold");
      const appTitle =
        language === "ar" ? "تعليمات التطبيق:" : "Application Instructions:";
      doc.text(appTitle, language === "ar" ? 170 : 20, yPos);
      doc.setFont("helvetica", "normal");
      yPos += 7;

      if (product.method_of_application) {
        const methodLabel =
          language === "ar" ? "طريقة التطبيق:" : "Application Method:";
        doc.setFont("helvetica", "bold");
        doc.text(methodLabel, language === "ar" ? 170 : 20, yPos);
        doc.setFont("helvetica", "normal");

        const method =
          language === "ar" && product.method_of_application_ar
            ? product.method_of_application_ar
            : product.method_of_application;
        const methodLines = doc.splitTextToSize(method, 150);
        doc.text(methodLines, language === "ar" ? 170 : 30, yPos + 7, {
          align: language === "ar" ? "right" : "left",
        });
        yPos += 7 + methodLines.length * 5;
      }
    }

    // Add footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      const footer =
        language === "ar"
          ? "تم إنشاؤه بواسطة ديكور - للحصول على أحدث المعلومات، يرجى زيارة موقعنا"
          : "Generated by Décor Paint - For the most up-to-date information, please visit our website.";
      doc.text(footer, 105, 285, { align: "center" });
    }

    // Save the PDF
    const fileName = `${product.name.toLowerCase().replace(/\s+/g, "-")}-specifications.pdf`;
    doc.save(fileName);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};
