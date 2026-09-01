import React from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface JsonLdProps {
  type: 'FAQPage' | 'Service';
  faqs?: FAQItem[];
  title?: string;
  description?: string;
}

export function JsonLd({ type, faqs = [], title = '', description = '' }: JsonLdProps) {
  if (type === 'FAQPage' && faqs.length > 0) {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    );
  }

  if (type === 'Service') {
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: title,
      description: description,
      provider: {
        '@type': 'Organization',
        name: 'SeguroSimulador',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Argentina',
      },
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    );
  }

  return null;
}
