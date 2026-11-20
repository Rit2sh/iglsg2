import { z } from "zod";

export const guestSubmissionSchema = z.object({
    // Author Profile
    title: z.enum(["Dr.", "Mr.", "Mrs", "Ms."], {
        message: "Please select a title",
    }),
    firstName: z.string().min(1, "First name is required"),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    mobileNumber: z.string().optional(),
    occupation: z.string().min(1, "Occupation is required"),
    institute: z.string().min(1, "Institute name is required"),
    nationality: z.string().optional(),
    address: z.string().optional(),

    // Manuscript Details
    additionalAuthors: z.enum(["None", "One", "Two"]),
    manuscriptType: z.enum([
        "Research Article", "Case Commentaries", "Book Review",
        "Essay", "Blog", "Monograph", "Dissertation", "Thesis"
    ]),

    // File Upload
    manuscriptFile: z.custom<File>((val) => val instanceof File, "Manuscript (Docx) is required"),

    // Declarations
    acceptTerms: z.boolean().refine((val) => val === true, {
        message: "You must accept the terms and conditions",
    }),
});