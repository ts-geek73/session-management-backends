-- Create tables
CREATE TABLE IF NOT EXISTS "contents" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "title" varchar(255) NOT NULL,
  "content" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "sessions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "content_id" uuid NOT NULL REFERENCES "contents"("id") ON DELETE CASCADE,
  "status" varchar(50) DEFAULT 'active' NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Insert initial content data only if table is empty
INSERT INTO "contents" ("title", "content")
SELECT 'Session Delta', 'Session Delta is dedicated to user experience design principles as applied within the platform''s frontend interface. This module is tailored for product managers, designers, and frontend developers who want to understand how UI decisions are made. You will review the design system, component library, and the guidelines that govern visual consistency across all screens. The session walks through several redesign case studies, highlighting before-and-after comparisons with user feedback data. Accessibility standards including WCAG 2.1 compliance are discussed in detail with examples. Participants will also explore how A/B testing is conducted to validate design changes. Prototyping tools integrated into the workflow are demonstrated live during this session. Feedback forms are embedded throughout to collect real-time participant reactions.'
WHERE NOT EXISTS (SELECT 1 FROM "contents" WHERE "title" = 'Session Delta');

INSERT INTO "contents" ("title", "content")
SELECT 'Session Epsilon', 'Session Epsilon provides a comprehensive overview of the platform''s security model and compliance framework. This session is essential for IT administrators, compliance officers, and anyone responsible for data governance. You will learn about encryption standards used at rest and in transit, including how keys are managed and rotated. The session covers audit logging, access reviews, and how to respond to a potential security incident. GDPR, SOC 2, and ISO 27001 compliance requirements are mapped to specific platform features. Participants will also review the vulnerability disclosure process and how security patches are prioritized and deployed. Threat modeling exercises are included to help teams identify risks in their own environments. The session concludes with a checklist for conducting internal security reviews.'
WHERE NOT EXISTS (SELECT 1 FROM "contents" WHERE "title" = 'Session Epsilon');

INSERT INTO "contents" ("title", "content")
SELECT 'Session Theta', 'Session Theta is a hands-on workshop focused on onboarding new team members to an existing project using the platform. This module is designed for team leads and project managers responsible for ramping up new hires or contractors. You will go through a structured onboarding checklist that covers environment setup, codebase orientation, and access provisioning. The session includes templates for documentation, role assignments, and communication protocols. Common friction points in onboarding—such as unclear ownership and missing documentation—are addressed with practical remedies. Participants will also learn how to use the platform''s collaboration features to keep distributed teams aligned. A sample onboarding timeline for a two-week ramp-up period is provided and can be customized to fit any team size. The session wraps up with a retrospective exercise to continuously improve the onboarding process.'
WHERE NOT EXISTS (SELECT 1 FROM "contents" WHERE "title" = 'Session Theta');

INSERT INTO "contents" ("title", "content")
SELECT 'Session Lambda', 'Session Lambda is the capstone module that brings together concepts from all previous sessions into a unified project walkthrough. This session is recommended for participants who have completed at least five prior modules and want to see how everything fits together in a real-world scenario. You will follow the lifecycle of a complete product feature from requirements gathering through design, development, testing, deployment, and post-launch monitoring. Each phase references tools and techniques covered in earlier sessions, reinforcing the learning with applied context. The session includes a collaborative exercise where small groups are assigned different phases of the same feature and must coordinate their outputs. A retrospective discussion covers what went well, what could be improved, and how the platform can better support the workflow. Participants receive a certificate of completion for the full learning path upon finishing this module. Feedback collected during this session directly informs future updates to the curriculum.'
WHERE NOT EXISTS (SELECT 1 FROM "contents" WHERE "title" = 'Session Lambda');
