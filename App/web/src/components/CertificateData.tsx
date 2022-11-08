export interface CertificateDataProps {
  name: string;
  generatedAt: string;
  certificateCode: string;
}

export function CertificateData({
  name,
  certificateCode,
  generatedAt,
}: CertificateDataProps) {
  return (
    <div className="flex flex-col bg-gray-500 p-4 rounded-lg mt-8">
      <span className="text-white font-bold text-xl">
        Nome: <span className="font-normal">{name}</span>
      </span>
      <span className="text-white font-bold text-xl">
        Gerado em: <span className="font-normal">{generatedAt}</span>
      </span>
      <span className="text-white font-bold text-xl">
        Código do Certificado:
        <span className="font-normal"> {certificateCode}</span>
      </span>
    </div>
  );
}
