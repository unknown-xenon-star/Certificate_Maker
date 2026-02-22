function generateCertificate() {
    let name = document.getElementById("name").value;
    let course = document.getElementById("course").value;

    document.getElementById("cert-name").innerText = name;
    document.getElementById("cert-course").innerText = course;

}

function downloadCertificate() {
    let certicate = document.getElementById("certificate");
    
    html2canvas(certicate, {
        useCORS: true,
        backgroundColor: #ffffff,
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

    let certicate = document.getElementById("certificate");

    html2canvas(certicate).then((canvas) => {
        let imgData = canvas.toDataURL("image/png");

        let pdf = new jsPDF("landscape", "mm", "a4");

        pdf.addImage(imgData, "PNG", 10, 10, 277, 190);

        pdf.save("certificate.pdf");
    });
}