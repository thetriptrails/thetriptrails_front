import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export const contactDetails = [
  {
    icon: Phone,
    title: "Call Us",
    info: "+91 95822 15091",
    color: "bg-blue-600"
  },
  {
    icon: Mail,
    title: "Email Us",
    info: "info@thetriptrails.com",
    color: "bg-[#C69E3D]"
  },
  {
    icon: MapPin,
    title: "Our Offices",
    info: "Uttarakhand & Gurugram",
    color: "bg-emerald-600",
    details: [
      "Uttarakhand: Himmatpur Block, Near Sai Mandir, Jim Corbett, Ramnagar, 244715",
      "Gurugram: Mistily No - 45, Killa No 6/2, Begampur Khatola, 122001"
    ]
  }
];