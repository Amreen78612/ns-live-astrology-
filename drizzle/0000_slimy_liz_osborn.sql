CREATE TABLE `articles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`excerpt` text NOT NULL,
	`content` text NOT NULL,
	`author` text NOT NULL,
	`category` text NOT NULL,
	`read_time` text NOT NULL,
	`is_published` integer DEFAULT false,
	`views` integer DEFAULT 0,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `astrologers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`experience_years` integer NOT NULL,
	`specialization` text NOT NULL,
	`languages` text NOT NULL,
	`rating` real DEFAULT 0,
	`total_consultations` integer DEFAULT 0,
	`price_per_consultation` integer NOT NULL,
	`is_available` integer DEFAULT true,
	`bio` text NOT NULL,
	`image_url` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `astrologers_email_unique` ON `astrologers` (`email`);--> statement-breakpoint
CREATE TABLE `bookings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`customer_name` text NOT NULL,
	`customer_email` text NOT NULL,
	`customer_phone` text NOT NULL,
	`service_type` text NOT NULL,
	`service_id` integer NOT NULL,
	`booking_date` text NOT NULL,
	`booking_time` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`payment_status` text DEFAULT 'pending' NOT NULL,
	`notes` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `courses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`duration_months` integer NOT NULL,
	`level` text NOT NULL,
	`price` integer NOT NULL,
	`instructor_name` text NOT NULL,
	`total_students` integer DEFAULT 0,
	`syllabus` text NOT NULL,
	`is_active` integer DEFAULT true,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `pandits` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`experience_years` integer NOT NULL,
	`specializations` text NOT NULL,
	`languages` text NOT NULL,
	`is_available` integer DEFAULT true,
	`bio` text NOT NULL,
	`image_url` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `pandits_email_unique` ON `pandits` (`email`);--> statement-breakpoint
CREATE TABLE `poojas` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`duration_hours` text NOT NULL,
	`required_pandits` integer NOT NULL,
	`price` integer NOT NULL,
	`includes_materials` integer DEFAULT true,
	`is_active` integer DEFAULT true,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`name` text NOT NULL,
	`role` text DEFAULT 'user' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);