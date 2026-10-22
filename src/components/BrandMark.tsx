type BrandMarkProps = {
  className?: string;
};

export default function BrandMark({ className = "brand-mark" }: BrandMarkProps) {
  return (
    <img
      className={className}
      src="https://thewarriorwizardgirl.com/images/flying-kick-logo.png"
      alt="The Warrior Wizard Girl flying-kick logo"
    />
  );
}
