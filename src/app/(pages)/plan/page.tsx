"use client";
import {
  Calendar,
  Dumbbell,
  Download,
  RefreshCcw,
  Target,
  TrendingUp,
} from "lucide-react";
import { PlanDisplay } from "@/components/layout/planDisplay";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useApp } from "@/context/AppContext";
import Navbar from "@/components/layout/navbar";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default function PlanPage() {
  const { isLoading, plan, generatePlan } = useApp();
  const router = useRouter();

  useEffect(() => {
    const profileId = localStorage.getItem("profileId");
    if (!profileId) {
      router.replace("/onboarding");
    }
  }, [router]);

  if (isLoading) return null; // or a spinner

  if (!plan) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-4">
        <p className="text-muted font-medium">No plan yet.</p>
        <Button onClick={generatePlan}>Generate Plan</Button>
      </div>
    );
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function downloadPlanAsPDF() {
    if (!plan) return;

    const pdfContainer = document.createElement("div");
    pdfContainer.style.position = "absolute";
    pdfContainer.style.left = "-9999px";
    pdfContainer.style.width = "1200px";
    pdfContainer.style.padding = "20px";
    pdfContainer.style.backgroundColor = "#ffffff";
    pdfContainer.style.fontFamily = "Arial, sans-serif";
    pdfContainer.style.color = "#000000";

    pdfContainer.innerHTML = `
      <div>
        <div style="margin-bottom: 32px;">
          <h1 style="font-size: 32px; font-weight: bold; margin-bottom: 8px; color: #000;">Your Training Plan</h1>
          <p style="font-size: 14px; color: #666666; margin-bottom: 0;">
            Version ${plan.version} • Created ${formatDate(plan.createdAt)}
          </p>
        </div>

        <div style="margin-bottom: 32px;">
          <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 16px; color: #000;">Plan Overview</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div style="padding: 16px; border: 1px solid #cccccc; border-radius: 8px;">
              <p style="font-size: 12px; color: #666666; margin-bottom: 4px; margin-top: 0;">Goal</p>
              <p style="font-size: 14px; font-weight: bold; margin: 0; color: #000;">${plan.overview.goal}</p>
            </div>
            <div style="padding: 16px; border: 1px solid #cccccc; border-radius: 8px;">
              <p style="font-size: 12px; color: #666666; margin-bottom: 4px; margin-top: 0;">Frequency</p>
              <p style="font-size: 14px; font-weight: bold; margin: 0; color: #000;">${plan.overview.frequency}</p>
            </div>
            <div style="padding: 16px; border: 1px solid #cccccc; border-radius: 8px;">
              <p style="font-size: 12px; color: #666666; margin-bottom: 4px; margin-top: 0;">Split</p>
              <p style="font-size: 14px; font-weight: bold; margin: 0; color: #000;">${plan.overview.split}</p>
            </div>
            <div style="padding: 16px; border: 1px solid #cccccc; border-radius: 8px;">
              <p style="font-size: 12px; color: #666666; margin-bottom: 4px; margin-top: 0;">Version</p>
              <p style="font-size: 14px; font-weight: bold; margin: 0; color: #000;">${plan.version}</p>
            </div>
          </div>
        </div>

        <div style="margin-bottom: 32px; padding: 16px; border: 1px solid #cccccc; border-radius: 8px;">
          <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 12px; margin-top: 0; color: #000;">Workout Notes</h2>
          <p style="font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap; color: #000;">${plan.overview.notes}</p>
        </div>

        <div style="margin-bottom: 32px;">
          <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 16px; margin-top: 0; color: #000;">Weekly Schedule</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f5f5f5;">
                <th style="padding: 12px; text-align: left; border: 1px solid #dddddd; font-weight: bold; color: #000;">Day</th>
                <th style="padding: 12px; text-align: left; border: 1px solid #dddddd; font-weight: bold; color: #000;">Exercises</th>
              </tr>
            </thead>
            <tbody>
              ${plan.weeklySchedule
                .map((day) => {
                  const exercises = day.exercises
                    .map((ex) => `${ex.name} (${ex.sets}x${ex.reps})`)
                    .join(", ");
                  return `
                    <tr>
                      <td style="padding: 12px; border: 1px solid #dddddd; font-size: 14px; color: #000;">${day.day}</td>
                      <td style="padding: 12px; border: 1px solid #dddddd; font-size: 14px; color: #000;">${exercises}</td>
                    </tr>
                  `;
                })
                .join("")}
            </tbody>
          </table>
        </div>

        <div style="padding: 16px; border: 1px solid #cccccc; border-radius: 8px;">
          <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 12px; margin-top: 0; color: #000;">Progression Strategy</h2>
          <p style="font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap; color: #000;">${plan.progression}</p>
        </div>
      </div>
    `;

    document.body.appendChild(pdfContainer);

    setTimeout(() => {
      html2canvas(pdfContainer, {
        backgroundColor: "#ffffff",
        scale: 2,
        allowTaint: true,
        useCORS: true,
        logging: false,
      })
        .then((canvas) => {
          document.body.removeChild(pdfContainer);

          const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
          });

          const imgData = canvas.toDataURL("image/png");
          const pageHeight = pdf.internal.pageSize.getHeight();
          const pageWidth = pdf.internal.pageSize.getWidth();
          const imgHeight = (canvas.height * pageWidth) / canvas.width;

          let heightLeft = imgHeight;
          let position = 0;

          pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
          heightLeft -= pageHeight;

          while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
            heightLeft -= pageHeight;
          }

          pdf.save(`workout-plan-v${plan.version}.pdf`);
        })
        .catch((error) => {
          if (document.body.contains(pdfContainer)) {
            document.body.removeChild(pdfContainer);
          }
          console.error("PDF generation error:", error);
          alert("Failed to generate PDF. Please try again.");
        });
    }, 100);
  }

  return (
    <div className="min-h-screen pt-2 pb-12 px-6">
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1 text-foreground">
              Your Training Plan
            </h1>
            <p className="text-muted font-medium">
              Version {plan.version} • Created {formatDate(plan.createdAt)}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              className="gap-2"
              onClick={downloadPlanAsPDF}
            >
              <Download className="w-5 h-5 text-accent" />
              Download
            </Button>
            <Button
              variant="secondary"
              className="gap-2"
              onClick={generatePlan}
            >
              <RefreshCcw className="w-5 h-5 text-accent" />
              Regenerate Plan
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8  text-background">
          <Card variant="bordered" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <Target className="w-5 h-5 text-background" />
            </div>
            <div>
              <p className="text-xl text-muted font-medium">Goal</p>
              <p className="font-medium text-sm text-cream">
                {plan.overview.goal}
              </p>
            </div>
          </Card>
          <Card variant="bordered" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xl text-muted font-medium">Frequency</p>
              <p className="font-medium text-sm text-cream">
                {plan.overview.frequency}
              </p>
            </div>
          </Card>
          <Card variant="bordered" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xl font-medium text-muted">Split</p>
              <p className="font-medium text-sm text-cream">
                {plan.overview.split}
              </p>
            </div>
          </Card>
          <Card variant="bordered" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xl font-medium text-muted">Version</p>
              <p className="font-medium text-sm text-cream">{plan.version}</p>
            </div>
          </Card>
        </div>

        <Card variant="bordered" className="mb-8">
          <h2 className="font-semibold text-lg mb-2 text-background">
            Workout Notes
          </h2>
          <p className="text-background font-medium text-xl leading-relaxed">
            {plan.overview.notes}
          </p>
        </Card>

        <h2 className="font-semibold text-xl mb-4">Weekly Schedule</h2>
        <PlanDisplay weeklySchedule={plan.weeklySchedule} />

        <Card variant="bordered" className="mb-8">
          <h2 className="font-semibold text-lg mb-2 text-background">
            Progression Strategy
          </h2>
          <p className="text-background font-medium text-xl leading-relaxed">
            {plan.progression}
          </p>
        </Card>
      </div>
    </div>
  );
}
