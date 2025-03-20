interface IFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  alt: string;
}
function FeatureCard({ feature }: { feature: IFeature }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div aria-label={feature.alt} className="relative">
        {feature.icon}
      </div>
      <div className="my-5">
        <h3 className="font-bold uppercase tracking-tighter">
          {feature.title}
        </h3>
        <p>{feature.description}</p>
      </div>
    </div>
  );
}

export default FeatureCard;
