'use client'

import { PortableText, type PortableTextComponents, type PortableTextBlock } from 'next-sanity'
import Image from 'next/image'
import type { RichTextSectionData } from '@/types/sanity'
import { getImageUrl } from '@/sanity/lib/image'

interface RichTextSectionProps {
    data: RichTextSectionData
}

const portableTextComponents: PortableTextComponents = {
    block: {
        h2: ({ children }) => (
            <h2 className="text-[32px] md:text-[40px] font-display font-medium tracking-[-0.02em] leading-[1.15] text-[#111827] mb-4 mt-8 first:mt-0">
                {children}
            </h2>
        ),
        h3: ({ children }) => (
            <h3 className="text-[24px] md:text-[28px] font-medium tracking-[-0.01em] leading-[1.2] text-[#111827] mb-3 mt-6">
                {children}
            </h3>
        ),
        h4: ({ children }) => (
            <h4 className="text-[18px] md:text-[20px] font-semibold text-[#111827] mb-2 mt-4">
                {children}
            </h4>
        ),
        normal: ({ children }) => (
            <p className="text-[16px] md:text-[17px] text-[#6B7280] leading-relaxed mb-4">
                {children}
            </p>
        ),
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#2563EB] pl-4 my-6 italic text-[#6B7280]">
                {children}
            </blockquote>
        ),
    },
    marks: {
        strong: ({ children }) => <strong className="font-semibold text-[#111827]">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        underline: ({ children }) => <span className="underline">{children}</span>,
        link: ({ children, value }) => {
            const target = value?.blank ? '_blank' : undefined
            const rel = value?.blank ? 'noopener noreferrer' : undefined
            return (
                <a
                    href={value?.href}
                    target={target}
                    rel={rel}
                    className="text-[#2563EB] hover:text-[#1E3A8A] underline transition-colors"
                >
                    {children}
                </a>
            )
        },
    },
    types: {
        image: ({ value }) => {
            const imageUrl = getImageUrl(value, { width: 1200 })
            if (!imageUrl) return null
            return (
                <figure className="my-8">
                    <div className="relative w-full aspect-video">
                        <Image
                            src={imageUrl}
                            alt={value.alt || 'Content image'}
                            fill
                            sizes="(max-width: 800px) 100vw, 800px"
                            className="object-contain rounded-xl"
                        />
                    </div>
                    {value.caption && (
                        <figcaption className="text-center text-[14px] text-[#9CA3AF] mt-3">
                            {value.caption}
                        </figcaption>
                    )}
                </figure>
            )
        },
    },
}

export default function RichTextSection({ data }: RichTextSectionProps) {
    if (!data) return null

    const bgColorClasses = {
        white: 'bg-white',
        gray: 'bg-[#F8F9FB]',
        teal: 'bg-[#2563EB]/5',
    }

    const bgClass = bgColorClasses[data.backgroundColor || 'white']

    return (
        <section className={`w-full ${bgClass} py-12 md:py-24 px-6 md:px-12 border-t border-[#E5E7EB]`}>
            <div className="max-w-[800px] mx-auto">
                {data.title && (
                    <h2 className="text-[32px] md:text-[40px] font-display font-medium tracking-[-0.02em] leading-[1.15] text-[#111827] mb-8 text-center">
                        {data.title}
                    </h2>
                )}
                {data.content && (
                    <div className="prose-custom">
                        <PortableText value={data.content} components={portableTextComponents} />
                    </div>
                )}
            </div>
        </section>
    )
}
