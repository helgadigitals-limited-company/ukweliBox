CREATE TABLE "attachment" (
	"id" text PRIMARY KEY NOT NULL,
	"attachmentUrl" text NOT NULL,
	"attachmentName" text NOT NULL,
	"attachmentType" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "feedback" (
	"id" text PRIMARY KEY NOT NULL,
	"fullname" text NOT NULL,
	"gender" text NOT NULL,
	"phoneNo" text NOT NULL,
	"email" text,
	"feedbackType" text NOT NULL,
	"message" text NOT NULL,
	"attachmentId" text,
	"responseId" text,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "feedbackType" (
	"id" text PRIMARY KEY NOT NULL,
	"feedbackType" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "response" (
	"id" text PRIMARY KEY NOT NULL,
	"response" text NOT NULL,
	"userId" text NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_feedbackType_feedbackType_id_fk" FOREIGN KEY ("feedbackType") REFERENCES "public"."feedbackType"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_attachmentId_attachment_id_fk" FOREIGN KEY ("attachmentId") REFERENCES "public"."attachment"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_responseId_response_id_fk" FOREIGN KEY ("responseId") REFERENCES "public"."response"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "response" ADD CONSTRAINT "response_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;