import express from "express";
import cors from "cors";
import { z } from "zod";
const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

const port = 3080;

import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";

app.post("/generate", async function (req, res) {
  const createPersonBody = z.object({
    personName: z.string(),
  });

  try {
    const { personName } = createPersonBody.parse(req.body);

    await prisma.person.create({
      data: {
        name: personName,
        certificateCode: uuidv4(),
      },
    });

    res.status(201).json({ message: `Certificado de '${personName}' gerado com sucesso!` });
    console.log(`Novo certificado para: '${personName}' gerado!`)

  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(error.issues);
    }
  }
});

app.get("/validate/:certificateId", async function(req, res) {
  const certificateId = req.params.certificateId

  const personCertificate = await prisma.person.findUnique({
    where: {
      certificateCode: certificateId
    }
  })

  res.status(200).json({
    personCertificate
  })
})

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}.`);
});
