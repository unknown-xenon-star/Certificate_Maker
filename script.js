function generateCertificate() {
    const name = document.getElementById("name").value.trim();
    const course = document.getElementById("course").value.trim();
    const issueDate = document.getElementById("issue-date").value;

    document.getElementById("cert-name").innerText = name || "Your Name";
    document.getElementById("cert-course").innerText = course || "Course Name";
    document.getElementById("cert-date").innerText = formatCertificateDate(issueDate);

}

function formatCertificateDate(value) {
    if (!value) {
        return "Date";
    }

    const [year, month, day] = value.split("-");
    if (!year || !month || !day) {
        return "Date";
    }

    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

window.addEventListener("DOMContentLoaded", () => {
    const issueDateInput = document.getElementById("issue-date");
    const today = new Date().toISOString().split("T")[0];
    issueDateInput.value = today;
    document.getElementById("cert-date").innerText = formatCertificateDate(today);
});

function downloadCertificate() {
    const certificate = document.getElementById("certificate");
    
    html2canvas(certificate, {
        useCORS: true,
        backgroundColor: "#ffffff",
        scale: 2
    }).then((canvas) => {
        const image = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = image;
        link.download = "certificate.png";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    }).catch(error => {
        console.error("Canvas error:", error);
    });
}

function downloadCertificateinPDF() {
    const { jsPDF } = window.jspdf;

    const certificate = document.getElementById("certificate");

    html2canvas(certificate, {
        useCORS: true,
        backgroundColor: "#ffffff",
        scale: 2
    }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("landscape", "mm", "a4");
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);

        const renderWidth = imgWidth * ratio;
        const renderHeight = imgHeight * ratio;
        const x = (pageWidth - renderWidth) / 2;
        const y = (pageHeight - renderHeight) / 2;

        pdf.addImage(imgData, "PNG", x, y, renderWidth, renderHeight);

        pdf.save("certificate.pdf");
    });
}
