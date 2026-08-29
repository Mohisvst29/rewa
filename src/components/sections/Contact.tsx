"use client";

import React, { useState, useEffect } from "react";
import { servicesData } from "@/data/services";
import {
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Loader2,
  Instagram,
  Twitter,
  Facebook
} from "lucide-react";
import { motion } from "framer-motion";

export function Contact() {

  const DISPLAY_PHONE = "+966565560831";
  const PHONE_LINK = "tel:+966565560831";
  const LOCATION = "(سيهات-الدمام)";

  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: ""
  });

  const [status, setStatus] = useState("idle");
  const [servicesList, setServicesList] = useState<Array<{ _id?: string; id?: string; title: string }>>(servicesData);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/services");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setServicesList(data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch services for contact form", error);
      }
    }
    fetchServices();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setStatus("submitting");

    const text = `
طلب جديد من الموقع

الاسم: ${formState.name}
الجوال: ${formState.phone}
البريد: ${formState.email}
الخدمة: ${formState.service}

الرسالة:
${formState.message}
`;

    const whatsappUrl =
      `https://wa.me/966565560831?text=${encodeURIComponent(text)}`;

    window.open(whatsappUrl, "_blank");

    setStatus("success");

    setFormState({
      name: "",
      phone: "",
      email: "",
      service: "",
      message: ""
    });

    setTimeout(() => setStatus("idle"), 4000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "يسعدنا خدمتك",
      value: DISPLAY_PHONE,
      link: PHONE_LINK,
      ltr: true
    },
    {
      icon: MapPin,
      title: "موقعنا",
      value: LOCATION,
      link: "https://maps.google.com"
    },
    {
      icon: Clock,
      title: "ساعات العمل",
      value: "يومياً: 10 ص - 10 م"
    }
  ];

  return (
    <section className="py-24 px-4 md:px-8 bg-[#FFFBF2]" dir="rtl" id="contact">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-20">

          <h2 className="text-4xl md:text-6xl font-bold text-[#5A4A42] mb-6">
            نحن هنا <span className="text-yellow-600">لخدمتك</span>
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            لديك استفسار أو ترغبين في حجز موعد؟ لا تترددي في التواصل معنا.
          </p>

        </div>

        <div className="flex flex-col lg:flex-row gap-10">

          {/* معلومات التواصل */}

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/3"
          >

            <div className="bg-white rounded-3xl p-8 shadow-lg">

              <h3 className="text-2xl font-bold mb-8">
                معلومات التواصل
              </h3>

              {contactInfo.map((info, index) => (

                <div key={index} className="flex items-center gap-4 mb-6">

                  <info.icon className="text-yellow-600" />

                  <div>

                    <p className="font-bold">
                      {info.title}
                    </p>

                    {info.link ? (

                      <a
                        href={info.link}
                        dir={info.ltr ? "ltr" : "rtl"}
                        style={
                          info.ltr
                            ? { direction: "ltr", unicodeBidi: "embed" }
                            : {}
                        }
                        className="text-gray-600"
                      >
                        {info.value}
                      </a>

                    ) : (

                      <p className="text-gray-600">
                        {info.value}
                      </p>

                    )}

                  </div>

                </div>

              ))}

              <div className="flex gap-4 mt-8">

                <a href="#"><Instagram /></a>
                <a href="#"><Twitter /></a>
                <a href="#"><Facebook /></a>

              </div>

            </div>

          </motion.div>

          {/* نموذج التواصل */}

          <div className="w-full lg:w-2/3">

            <div className="bg-white rounded-3xl p-10 shadow-lg">

              <h3 className="text-3xl font-bold mb-8">
                أرسلي لنا رسالة
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">

                <input
                  type="text"
                  name="name"
                  placeholder="الاسم الكامل"
                  value={formState.name}
                  onChange={handleChange}
                  className="w-full p-4 border rounded-xl"
                  required
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="رقم الجوال"
                  value={formState.phone}
                  onChange={handleChange}
                  className="w-full p-4 border rounded-xl"
                  required
                  dir="ltr"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="البريد الإلكتروني"
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full p-4 border rounded-xl"
                />

                <select
                  name="service"
                  value={formState.service}
                  onChange={handleChange}
                  className="w-full p-4 border rounded-xl bg-white"
                >
                  <option value="">اختر الخدمة</option>
                  {servicesList.map((srv, index) => (
                    <option key={srv._id || srv.id || index} value={srv.title}>
                      {srv.title}
                    </option>
                  ))}
                </select>

                <textarea
                  name="message"
                  rows={4}
                  placeholder="اكتبي رسالتك"
                  value={formState.message}
                  onChange={handleChange}
                  className="w-full p-4 border rounded-xl"
                />

                <button
                  type="submit"
                  className="w-full bg-[#5A4A42] text-white p-4 rounded-xl flex items-center justify-center gap-2"
                >

                  {status === "submitting" && (
                    <Loader2 className="animate-spin" />
                  )}

                  {status === "success" ? (
                    <>
                      <CheckCircle2 />
                      تم الإرسال
                    </>
                  ) : (
                    <>
                      <Send />
                      إرسال الطلب
                    </>
                  )}

                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
