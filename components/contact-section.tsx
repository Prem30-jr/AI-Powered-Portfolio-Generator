"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  LinkedinIcon,
  GithubIcon,
  TwitterIcon,
  SendIcon,
  LoaderIcon,
} from "lucide-react"

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const contactInfo = [
    {
      icon: <MailIcon className="h-5 w-5" />,
      label: "Email",
      value: "hello@yourname.com",
      href: "mailto:hello@yourname.com",
    },
    {
      icon: <PhoneIcon className="h-5 w-5" />,
      label: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
    },
    {
      icon: <MapPinIcon className="h-5 w-5" />,
      label: "Location",
      value: "San Francisco, CA",
      href: "#",
    },
  ]

  const socialLinks = [
    {
      icon: <LinkedinIcon className="h-5 w-5" />,
      label: "LinkedIn",
      href: "https://linkedin.com/in/yourname",
    },
    {
      icon: <GithubIcon className="h-5 w-5" />,
      label: "GitHub",
      href: "https://github.com/yourname",
    },
    {
      icon: <TwitterIcon className="h-5 w-5" />,
      label: "Twitter",
      href: "https://twitter.com/yourname",
    },
  ]

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Message sent successfully!",
          description: data.message,
        })
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        throw new Error(data.error || "Something went wrong")
      }
    } catch (error) {
      toast({
        title: "Error sending message",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-muted/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Get In Touch</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to start your next project? Let's discuss how we can work together to bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="animate-slide-up">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Let's Connect</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                I'm always interested in new opportunities, collaborations, and interesting projects. Whether you have a
                question or just want to say hi, I'll try my best to get back to you!
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="text-primary bg-primary/10 p-3 rounded-lg">{info.icon}</div>
                  <div>
                    <p className="font-medium text-foreground">{info.label}</p>
                    <a
                      href={info.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {info.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary p-2 rounded-lg hover:bg-primary/10 transition-all duration-200"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="animate-slide-up card-hover">
            <CardHeader>
              <CardTitle className="text-2xl">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Your full name"
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your.email@example.com"
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    placeholder="What's this about?"
                    className={errors.subject ? "border-destructive" : ""}
                  />
                  {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Tell me about your project or just say hello..."
                    rows={6}
                    className={errors.message ? "border-destructive" : ""}
                  />
                  {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <SendIcon className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
