import Image from "next/image";

interface RoleCardProps {
  role: "MENTEE" | "MENTOR";
  selectedRole: "MENTEE" | "MENTOR" | null;
  onSelect: (role: "MENTEE" | "MENTOR") => void;
  imageSrc: string;
  title: string;
  description1: string;
  description2: string;
}

const RoleCard: React.FC<RoleCardProps> = ({
  role,
  selectedRole,
  onSelect,
  imageSrc,
  title,
  description1,
  description2,
}) => {
  const textColor = selectedRole === role ? "text-black01" : "text-gray06";
  const borderColor =
    selectedRole === role ? "border-green03" : "border-transparent";

  return (
    <div
      onClick={() => onSelect(role)}
      className={`w-full px-global pt-[10px] pb-[32px] bg-white01 select-none flex flex-col items-center justify-center border-2 cursor-pointer rounded-[20px] transition-all ${borderColor}`}
    >
      <Image
        src={imageSrc}
        alt={title}
        width={140}
        height={140}
        style={{ width: "100%", height: "auto" }}
        className="object-contain"
      />

      <div className={`mt-2 text-center ${textColor}`}>
        <p className={`text-Body2_M_14`}>
          {description1}
          <br />
          {description2}
        </p>
        <p className={`text-Body1_B_16`}>{title}</p>
      </div>
    </div>
  );
};

export default RoleCard;
