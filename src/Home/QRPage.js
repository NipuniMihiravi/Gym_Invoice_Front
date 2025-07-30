import React from "react";
import { QRCodeCanvas } from "qrcode.react";

function QRPage() {
  return (
    <div>
      <h2>Scan to Register</h2>
      <QRCodeCanvas value="http://localhost:3000/register" size={256} />
    </div>
  );
}

export default QRPage;
