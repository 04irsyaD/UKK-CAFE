import React, { useRef } from "react";


export default function Cetak({ data }) {
  const printWindow = useRef(null);

  const handleCetak = () => {
    // Buka jendela cetak
    const printWindowRef = window.open("", "", "width:120px, height:120px");
    printWindowRef.document.open();

    // Kode HTML untuk mencetak
    const htmlContent = `
      <html>
        <head>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }

            table, th, td {
              border: 1px solid black;
            }

            th, td {
              padding: 8px;
              text-align: left;
            }

            .print-content {
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
            }

            .logo {
              display: none;
              width: 200px;
              height: 200px;
            }

            h4, p {
              margin: 2px;
            }
          </style>
        </head>
        <body>
          <div class="print-content">
            <h1>Nota</h1>
            
            <table>
              <tr>
                <th>Nama Pelanggan</th>
                <th>Alamat</th>
                <th>Nomor Meja</th>
                <th>Total Harga</th>
                <th>Status</th>
              </tr>
              <tr>
                <td>${data.nama_pelanggan}</td>
                <td>${data.alamat}</td>
                <td>${data.meja.nomor_meja}</td>
                <td>${data.total}</td>
                <td>${data.status}</td>
              </tr>
            </table>
            <br>
            <br>
            <br>
            
          </div>
        </body>
      </html>        
    `;

    // Menulis konten HTML ke jendela cetak
    printWindowRef.document.write(htmlContent);
    printWindowRef.document.close();

    // Menampilkan gambar saat mencetak
    // printWindowRef.document.querySelector(".logo").style.display = "block";

    // Melakukan pencetakan
    printWindowRef.print();
    printWindowRef.close();
  };

  return (
    <button
      onClick={handleCetak}
      className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-600"
    >
      Cetak
    </button>
  );
}