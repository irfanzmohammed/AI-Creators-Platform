"use client"
import CustomMouse from "@/components/CustomMouse";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle,Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { features, platformTabs, socialProofStats, testimonials } from "@/lib/data";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const[activeTab,setActiveTab]=useState(0);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
    <div className="fixed inset-0 bg-gradient-to-br from purple-900/20 via-blue-900/20
    to green-900/20 animate-pulse"/>
    <CustomMouse/>
    
    {/* Hero section */}
    <section className="relative z-10 mt-48 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="space-y-6  sm:space-y-8 text-center lg:text-left">
          <div>
            <h1 className="text-7xl lg:text-8xl font-black leading none tracking-tight ">
              <span className="block font-black text-white">Create.</span>
              <span className="block font-light italic text-purple-300">Publish.</span>
              <span className="block font-black bg-gradient-to-r from-blue-400 via-purple-400 to 
              -green-400 bg-clip-text text-transparent">Grow.</span>
              </h1>  
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light
              leading-relaxed max-w-2xl md:max-w-none ">
                  The AI-powered platform that turns your ideas into
                  <span className="text-purple-300 font-semibold"> 
                    {" "}
                     engaging content 
                    </span> {" "}
                    and helps you build a thriving creator business.
              </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 md:justify-center  lg:justify-start lg:items-start ">
            <Link href="/dashboard">
            <Button
            // size="xl"
            variant="primary"
            className='w-full px-8 py-4 rounded-full text-white sm:w-auto'
            >
              Start Creating for Free
              <ArrowRight className="h-4 w-4"/>
            </Button>
            </Link>

            <Link href="/feed">
            <Button
            // size="xl"
            variant="outline"
            className='w-full rounded-full  sm:w-auto'
            >
              Explore the Feed
              <ArrowRight className="h-4 w-4"/>
            </Button>
            </Link>
          </div>
        </div>
        
      <div>
        <Image
        alt="Platform Banner"
        src="/banner.png"
        width={500}
        height={700}
        className="w-full h-auto object-contain"
        priority
        />
      </div>
      </div>
    </section>
    
    {/* features */}
    <section id='features'
    className="relative mt-14 z-10 py-16 sm:py-24 
    px-4 sm:px-6 bg-gradient-to-r from-gray-900/50 to purple-900/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black
          mb-4 sm:mb-6">
            <span className="gradient-text-primary">
              Everything you need
            </span>
             </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl  mx-auto px-4">
              From AI-powered writing assistance to advanced analytics,
              we&apos;ve built the complete toolkit for modern creators.
            </p>
        </div>
         <div className="grid sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 gap-6">
          {
            features.map((feature,index)=>{
            return(
              <Card 
              key={index}
              className="group transition-all duration-300 hover:scale-105 card-glass">
              <CardContent>
               <div className={`w-12 h-12 sm:w-16 h-16 bg-gradient-to-br ${
                feature.color} rounded-2xl flex items-center justify-center mb-4 sm:mb-6
                group-hover:scale-110 transition-transform
               `}>

                <feature.icon className="w-6 h-6 sm:w-8 h-8 text-white"/>

               </div>
            <CardTitle className="text-lg sm:text-xl mb-3 sm:mb-4 text-white">{feature.title}</CardTitle>
            <CardDescription className="text-sm sm:text-base text-gray-400">{feature.desc}</CardDescription>
            </CardContent>
            </Card>
            )            
          })}
         </div>
      </div>
    </section>

    {/* platform showcase */}

    <section className="relative z-10 py:16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
       <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl  font-black
          mb-4 sm:mb-6">
            <span className="gradient-text-primary">
              How it Works
            </span>
             </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl  mx-auto px-4">
             Three powerful modules working together to supercharge your  content creation.
            </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3">
          <div className="space-y-4">
            {
              platformTabs.map((tab,index)=>{
                return(
               <Button className="w-full justify-start h-auto p-6"
               key={index}
               variant={activeTab===index ?"outline":"ghost"}
               onClick={()=>setActiveTab(index)}
               >
                <div className="flex items-center gap-4">
                <div className={
                  `w-12 h-12 rounded-xl flex items-center justify-center
                  ${activeTab ===index ?"bg-gradient-to-br from-purple-500 to-blue-500"
                    :"bg-muted"}`
                }>
                  <tab.icon className="w-6 h-6"/>
                 </div> 
                  <div className="text-left">
                    <h3 className="font-bold text-lg">{tab.title}</h3>
                </div>
                </div>
               </Button>
                )
            })}
          </div>
          </div>
          <div className="lg:w-2/3">
          <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
       <CardTitle>{platformTabs[activeTab].title}</CardTitle>
       <CardDescription>{platformTabs[activeTab].description}</CardDescription>
 
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 gap-4">
          {
            platformTabs[activeTab].features.map((feature,index)=>{
              return(
                <div key={index}
                className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              )
            })}
          </div>
         </CardContent>
         </Card>
          </div>
        </div>
        </div>
    </section>


    {/* social proof */}

    <section className="relative z-10 py:16 sm:py-24 px-4 sm:px-6
     bg-gradient-to-r from-gray-900/50 to purple-900/20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl  font-black
        mb-12 sm:mb-16">
          <span className="gradient-text-primary">Loved By Creaters WorldWide</span>
        </h2>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4
      lg:gap-8
      ">
      {
        socialProofStats.map((stat,index)=>{
            return(
              <div className="text-center"
              key={index}>

      <div className="w-12 h-12 flex items-center justify-center
      rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500
      mx-auto mb-3 sm:mb-4">
        <stat.icon className="w-6 h-6 sm:w-7 sm::h-7 lg:w-8 lg:h-8 text-white"/>
      </div>
      <div className="text-3xl sm:text-4xl lg:text-5xl font-black mb-2
      gradient-text-accent">
      {stat.metric}
      </div>
      <div className="text-gray-400 sm:text-lg text-base">
        {stat.label}
      </div>
      </div>
            )
        }
      )
      }
      </div>
    </section>


{/* 
    testimonials */}

     <section className="relative z-10 py:16 sm:py-24 px-4 sm:px-6">
       <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl  font-black
          mb-4 sm:mb-6">
            <span className="gradient-text-primary">
              What Creaters Say
            </span>
             </h2>
             </div>
               <div className="grid md:grid-cols-3 gap-8">
          {
            testimonials.map((testimonial,index)=>{
            return(
              <Card 
              key={index}
              className="transition-all duration-300 hover:shadow:lg card-glass">
              <CardContent className="p-8">
              <div className="flex items-center gap-1 mb-4">
             {
              [...Array(testimonial.rating)].map((_,i)=>
              (
                <Star key={i}
                 className="text-yellow-400 fill-yellow-400 w-4 h-4"/>
              )
              )
             }
              </div>
              <p className="mb-6 text-gray-300 leading-relaxed"> &quot;{testimonial.content}&quot;</p>
              <div className="flex items-center gap-4">
                <div className="relative  h-12 w-12">
                  <Image
                        src={`https://images.unsplash.com/photo-${testimonial.imageId}?w=100&h=100&fit=crop&crop=face`}
                        alt={testimonial.name}
                        fill
                        className="rounded-full border-2 border-gray-700 object-cover"
                        sizes="48px"
                      />
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
                  <Badge variant="secondary" className="mt-1">{testimonial.company}</Badge>
                </div>
              </div>
            </CardContent>
            </Card>
            )            
          })}
         </div>
       </div>
    </section>

{/* CTA section */}
        <section className="relative z-10 py:16 sm:py-24 px-4 sm:px-6
     bg-gradient-to-r from-gray-900/50 to purple-900/20">
      <div className="max-w-4xl mx-auto text-center">
       <h2 className="text-4xl sm:text-5xl md:text-6xl  font-black
          mb-6 sm:mb-8">
            <span className="gradient-text-primary">
            Ready to create?
            </span>
             </h2>
             <p className="text-xl text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto">  
              Join thousands of creaters who are already building their audience
            and growing their business with our AI-powered platform.</p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/dashboard">
              <Button
                // size="xl"
                variant="primary"
                className="rounded-full text-white w-full"
              >
                Start Your Journey
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/feed">
              <Button
                variant="outline"
                // size="xl"
                className="rounded-full w-full"
              >
                Explore the Feed
              </Button>
            </Link>
          </div>
            </div>
     </section>

     


    </div>
  )
}
