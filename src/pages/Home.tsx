
import { Icons } from "@/components/Icons";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Memories } from "@/components/Memories";
//import { buttonVariants } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
   <div className="bg-slate-50">
      <Navbar />
    <section>
        <MaxWidthWrapper className='pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pb-52'>
          <div className='col-span-2 px-6 lg:px-0 lg:pt-4'>
            <div className='relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start'>
              <div className='absolute w-28 left-0 -top-20 hidden lg:block'>
                <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t via-slate-50/50 from-slate-50 h-28' />
                </div>
                <h1 className="relative antialiased w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">Caring for your family, <span className="bg-black px-2 text-white">Always!</span></h1>
                <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                At Romonas Home Care, we deliver compassionate, <span className="font-semibold">24/7 care</span> tailored to the unique needs of your loved ones, ensuring their comfort, safety, and well-being within our trusted senior retirement community.
                </p>

                <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                  <div className="space-y-2">
                    <li className="flex gap-1.5 items-center text-left">
                      <Check className="h-5 w-5 shrink-0 "/>
                      Personalized care plans tailored to each resident’s needs.
                    </li>
                    <li className="flex gap-1.5 items-center text-left">
                      <Check className="h-5 w-5 shrink-0 "/>
                      A warm, supportive environment that feels like family.
                    </li>
                    <li className="flex gap-1.5 items-center text-left">
                      <Check className="h-5 w-5 shrink-0 "/>
                      24/7 care from compassionate professionals.
                    </li>
                  </div>
                </ul>

                <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                  <div className="flex -space-x-4">
                    <img className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100" 
                          src="/users/user-1.jpg"
                          alt="user image"/>
                    <img className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100" 
                          src="/users/user-2.jpg"
                          alt="user image"/>
                    <img className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100" 
                          src="/users/user-3.jpg"
                          alt="user image"/>
                    <img className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100" 
                          src="/users/user-4.jpg"
                          alt="user image"/>
                    <img className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100" 
                          src="/users/user-5.jpg"
                          alt="user image"/>
                  </div>
                  <div className="flex flex-col justify-between items-center sm:items-start">
                    <div className="flex gap-0.5">
                      <Star className='h-4 w-4 fill-black' />
                      <Star className='h-4 w-4 fill-black' />
                      <Star className='h-4 w-4 fill-black' />
                      <Star className='h-4 w-4 fill-black' />
                      <Star className='h-4 w-4 fill-black' />
                    </div>

                    <p><span className="semi-bold">20+</span> Current Residents</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mt-20 h-fit">
              <div className="relative md:max-w-xl before:absolute before:inset-0 before:bg-white before:blur-md before:rounded-lg before:z-[-1] before:content-['']">
                <img
                  src="/landing-2.jpeg"
                  className="drop-shadow-lg relative z-10 rounded-lg"
                />
              </div>
            </div>


        </MaxWidthWrapper>
    </section>

    {/* value proposition section*/}
    <section className="bg-slate-100 py-24">
      <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
        <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
          <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
            What our <span className="relative px-2">families <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6" />
            </span>{' '} say</h2>
            <img src="/landing-1.jpg" className="w-24 order-0 lg:order-2"/>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:max-0 lg:max-w-none lg:grid-cols-2 gap-y-16">
          <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
            <div className="flex gap-0.5 mb-2">
              <Star className="h-5 w-5 fill-black"/>
              <Star className="h-5 w-5 fill-black"/>
              <Star className="h-5 w-5 fill-black"/>
              <Star className="h-5 w-5 fill-black"/>
              <Star className="h-5 w-5 fill-black"/>
            </div>
            <div className="text-lg leading-8">
              <p>
              “Romonas Home Care has been a true blessing for our family. The staff is incredibly attentive and caring, always going above and beyond to ensure <span className="p-0.5 bg-slate-800 text-white">my mother is comfortable and happy.</span> Knowing she’s in such good hands gives us peace of mind every day. We couldn’t have asked for a better place for her to live.”
              </p>
            </div>
            <div className="flex gap-4 mt-2">
              <img className="rounded-full h-12 w-12 object-cover"
              src="/users/user-2.jpg" 
              alt="user"/>
              <div className="flex flex-col">
                <p className="font-semibold">Jonathon</p>
                <div className="flex gap-1.5 items-center text-zinc-600">
                  <Check className="h-4 w-4 stroke-[3px]"/>
                  <p className="text-sm">Verified resident</p>
                </div>
              </div>
            </div>
          </div>  

          {/* second user review */ }
          <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
            <div className="flex gap-0.5 mb-2">
              <Star className="h-5 w-5 fill-black"/>
              <Star className="h-5 w-5 fill-black"/>
              <Star className="h-5 w-5 fill-black"/>
              <Star className="h-5 w-5 fill-black"/>
              <Star className="h-5 w-5 fill-black"/>
            </div>
            <div className="text-lg leading-8">
              <p>
              “Choosing Romonas Home Care for my dad was the best decision we made. <span className="p-0.5 bg-slate-800 text-white">The team treats him like family</span>, and he’s thriving in their care. The warm, welcoming environment and the <span className="p-0.5 bg-slate-800 text-white">personalized attention</span> he receives have made all the difference. We’re so grateful for the love and support they provide.”
              </p>
            </div>
            <div className="flex gap-4 mt-2">
              <img className="rounded-full h-12 w-12 object-cover"
              src="/users/user-3.jpg" 
              alt="user"/>
              <div className="flex flex-col">
                <p className="font-semibold">Susan</p>
                <div className="flex gap-1.5 items-center text-zinc-600">
                  <Check className="h-4 w-4 stroke-[3px]"/>
                  <p className="text-sm">Verified resident</p>
                </div>
              </div>
            </div>
          </div>  
        </div>
      </MaxWidthWrapper>

      <div className='pt-16'>
        <Memories />
      </div>

    </section>
    <section className="bg-slate-100">
      <MaxWidthWrapper className="py-24" >
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className='order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900'>
                Get in touch today!
              </h2>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-4">
        {/* <Link
          href="/job-application"
          className={`w-60 ${buttonVariants({ size: 'lg', variant: 'default' })}`}
        >
          Work Opportunity
        </Link>
        <span>Or</span>
        <Link
          href="/contact"
          className={`w-60 ${buttonVariants({ size: 'lg', variant: 'default' })}`}
        >
          Our Services
        </Link> */}
      </div>
            
      </MaxWidthWrapper>
    </section>
   </div>
  );
}