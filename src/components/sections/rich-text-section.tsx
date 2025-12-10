'use client'

import { PortableText, type PortableTextComponents, type PortableTextBlock } from 'next-sanity'
import Image from 'next/image'
import type { RichTextSectionData } from '@/types/sanity'
import { urlFor } from '@/sanity/lib/image'

interface RichTextSectionProps {
    data: RichTextSectionData
}

const portableTextComponents: PortableTextComponents = {
    block: {
        h2: ({ children }) => (
            <h2 className="text-[32px] md:text-[40px] font-medium tracking-[-0.02em] leading-[1.15] text-[#0a0a0b] mb-4 mt-8 first:mt-0">
                {children}
            </h2>
        ),
        h3: ({ children }) => (
            <h3 className="text-[24px] md:text-[28px] font-medium tracking-[-0.01em] leading-[1.2] text-[#0a0a0b] mb-3 mt-6">
                {children}
            </h3>
        ),
        h4: ({ children }) => (
            <h4 className="text-[18px] md:text-[20px] font-semibold text-[#0a0a0b] mb-2 mt-4">
                {children}
            </h4>
        ),
        normal: ({ children }) => (
            <p className="text-[16px] md:text-[17px] text-[#52525b] leading-relaxed mb-4">
                {children}
            </p>
        ),
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#0d9488] pl-4 my-6 italic text-[#71717a]">
                {children}
            </blockquote>
        ),
    },
    marks: {
        strong: ({ children }) => <strong className="font-semibold text-[#0a0a0b]">{children}</strong>,
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
                    className="text-[#0d9488] hover:text-[#0f766e] underline transition-colors"
                >
                    {children}
                </a>
            )
        },
    },
    types: {
        image: ({ value }) => {
            if (!value?.asset?._ref) return null
            return (
                <figure className="my-8">
                    <Image
                        src={urlFor(value).width(1200).url()}
                        alt={value.alt || 'Image'}
                        width={1200}
                        height={675}
                        className="w-full h-auto rounded-xl"
                    />
                    {value.caption && (
                        <figcaption className="text-center text-[14px] text-[#a1a1aa] mt-3">
                            {value.caption}
                        </figcaption>
                    )}
                </figure>
            )
        },
    },
}

export default function RichTextSection({ data }: RichTextSectionProps) {
    const bgColorClasses = {
        white: 'bg-white',
        gray: 'bg-[#f4f4f5]',
        teal: 'bg-[#0d9488]/5',
    }

    const bgClass = bgColorClasses[data.backgroundColor || 'white']

    return (
        <section className={`w-full ${bgClass} py-16 md:py-24 px-6 md:px-12 border-t border-[#e4e4e7]`}>
            <div className="max-w-[800px] mx-auto">
                {data.title && (
                    <h2 className="text-[32px] md:text-[40px] font-medium tracking-[-0.02em] leading-[1.15] text-[#0a0a0b] mb-8 text-center">
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
