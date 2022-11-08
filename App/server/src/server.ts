import fs from "fs";
import cors from "cors";
import { z } from "zod";
import express from "express";
import path from "path";
import PDFDocument from "pdfkit";

const doc = new PDFDocument({
  layout: "landscape",
  size: "A4",
});

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'))

const port = 3080;

import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";

app.post("/generate", async function (req, res) {
  const createPersonBody = z.object({
    personName: z.string(),
  });

  const doc = new PDFDocument({
    layout: "landscape",
    size: "A4",
  });

  const { personName } = createPersonBody.parse(req.body);
  const certificateCode = uuidv4();

  doc.pipe(
    fs.createWriteStream(
      `./public/generatedCertificates/${certificateCode}.pdf`
    )
  );
  doc.image("./base.png", 0, 0, { width: 842 });

  if (personName.length > 21 && personName.length < 32) {
    doc
      .fillColor("white")
      .font("./fonts/Roboto-Bold.ttf")
      .fontSize(38)
      .text(personName, 55, 250, {
        align: "center",
      });
  } else if (personName.length > 32) {
    doc
      .fillColor("white")
      .font("./fonts/Roboto-Bold.ttf")
      .fontSize(30)
      .text(personName, 55, 260, {
        align: "center",
      });
  } else {
    doc
      .fillColor("white")
      .font("./fonts/Roboto-Bold.ttf")
      .fontSize(50)
      .text(personName, 55, 240, {
        align: "center",
      });
  }

  doc
    .fillColor("#b7bfc4")
    .font("./fonts/Roboto-Bold.ttf")
    .fontSize(12)
    .text(certificateCode, 130, 25);

  doc.end();
  await prisma.person.create({
    data: {
      name: personName,
      certificateCode,
    },
  });

  res
    .status(201).json({
      redirect: `http://localhost:3080/public/generatedCertificates/${certificateCode}.pdf`
    })

  console.log(
    path.resolve(`./public/generatedCertificates/${certificateCode}.pdf`)
  );

  console.log(`Novo certificado para: '${personName}' gerado!`);
});

app.get("/validate/:certificateId", async function (req, res) {
  const certificateId = req.params.certificateId;

  const personCertificate = await prisma.person.findUnique({
    where: {
      certificateCode: certificateId,
    },
  });

  res.status(200).json({
    personCertificate,
  });
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}.`);
});
