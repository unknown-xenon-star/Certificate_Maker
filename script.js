function generateCertificate() {
    const name = document.getElementById("name").value.trim();
    const course = document.getElementById("course").value.trim();

    document.getElementById("cert-name").innerText = name || "Your Name";
    document.getElementById("cert-course").innerText = course || "Course Name";

}

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

    html2canvas(certificate).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("landscape", "mm", "a4");

        pdf.addImage(imgData, "PNG", 10, 10, 277, 190);

        pdf.save("certificate.pdf");
    });
}
