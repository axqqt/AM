import { Button } from "./ui/button";
import { Link } from "react-router-dom";
function HeroSection() {
  return (
    <section className="w-full px-24 border-b border-border">
      <div className="container py-12">
        <div className="flex justify-between items-center w-full gap-6">
          <div className="flex flex-col justify-between items-start gap-3">
            <p className="text-muted">WELCOME TO AFFILIATED!</p>
            <h1 className="text-white text-5xl font-bold">
              Get Your Products Viral! 💸
            </h1>
            <h2 className="text-muted text-3xl">
              Sell your affiliate products through <br /> affiliated and get
              Sales!
            </h2>
            <div className="flex justify-between items-center gap-6 mt-5">
              <Button>Get Started</Button>
              <Link to="#products"><Button variant="outline">Explore Products</Button></Link>
            </div>
          </div>
          <div>
            <img
              src="/bg.jpg"
              alt="background"
              width={400}
              className="rounded-2xl"
            />
          </div>
        </div>
        HeroSection
      </div>
    </section>
  );
}

export default HeroSection;
