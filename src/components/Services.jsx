import { BsShieldFillCheck } from "react-icons/bs";
import { MdOutlineSecurity } from "react-icons/md";
import { FaFileContract } from "react-icons/fa6";
import { TbCurrencyBitcoin } from "react-icons/tb";
import { BiFontSize, BiSearchAlt } from "react-icons/bi";
const ServiceCard = ({ title, logo, color, subtitle }) => {
  return (
    <div className="flex flex-row text-white white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl transform transition-transform duration-300 hover:scale-105">
      <div
        className={`flex justify-center items-center w-1/3 rounded-full ${color}`}
      >
        {logo}
      </div>
      <div className="flex flex-col pr-4">
        <h1 className="text-lg text-green-500 ">{title}</h1>
        <p className="text-sm font-sans">{subtitle}</p>
      </div>
    </div>
  );
};
const Services = () => {
  return (
    <div className="flex flex-col md:flex-row w-full justify-center justify-between items-center gradient-bg-services p-6">
      <div className="h-full w-full border pt-6">
        <h1 className="text-white text-shadow pb-4">
          Get started today and start earning great rewards
        </h1>
        <img src="../images/sc.png" className="w-full h-full" />
      </div>
      <div className="flex flex-col ml-10 w-1/3">
        <ServiceCard
          title="Guaranteed Security"
          logo={<MdOutlineSecurity fontSize={21} />}
          subtitle="Utilizing our secure DApp, we ensure safe Ethereum transfers via standard procedures, guaranteeing blockchain security for seamless transactions"
          color="bg-[#2952E3]"
        />
        <ServiceCard
          title="Regular Security Updates"
          logo={<MdOutlineSecurity fontSize={21} className="h-full w-full" />}
          subtitle="Consistent measures fortify against threats, ensuring ongoing protection for users and the platform."
          color="bg-[#2952E3]"
        />

        <ServiceCard
          title="Immutable Smart Contracts"
          logo={<FaFileContract fontSize={21} className="text-red flex-grow" />}
          subtitle=" Unchangeable code preserves transparency and reliability in contract execution"
          color="bg-[#2952E3]"
        />
        <ServiceCard
          title="Decentralized Storage"
          logo={<TbCurrencyBitcoin fontSize={21} />}
          subtitle="Data distributed across networks enhances security and resilience against single-point vulnerabilities"
          color="bg-[#2952E3]"
        />
      </div>
    </div>
  );
};
export default Services;
