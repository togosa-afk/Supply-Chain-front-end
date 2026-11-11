# UI component reference

## Root layout

- **Description:** Provides shared font variables, global styles, and the document shell.
- **Variants:** English document default; route content declares its own language and direction when needed.
- **Props:** `children` from the App Router.
- **States:** Static.
- **Accessibility:** Keeps language metadata accurate at route content boundaries.
- **Do:** Set `lang` and `dir` on localized page content.
- **Don't:** Assume every route uses the same language or reading direction.

## Global interaction styles

- **Description:** Shared keyboard focus treatment and the **NEW** `.button-spinner` loading indicator.
- **Variants:** Focus-visible outline; inline spinner for active form submissions.
- **Props:** None.
- **States:** Focused; loading.
- **Accessibility:** Focus remains visible for keyboard users; spinner is decorative and paired with loading text and `aria-busy`.
- **Do:** Keep a textual loading label when showing the spinner.
- **Don't:** Use the spinner without a status label or remove the focus outline without a replacement.

## HeroSection

- **Description:** Landing-page introduction and primary registration action.
- **Variants:** Arabic/RTL and English/LTR through the supplied copy and language.
- **Props:** `copy: HomeContent`; `language: Language`.
- **States:** Static content.
- **Accessibility:** Uses a page-level heading; decorative icons are hidden from assistive technology; the primary CTA is a real route link.
- **Do:** Keep the primary action directed to account registration.
- **Don't:** Make decorative shipment-card details appear interactive.

## ClosingSection

- **Description:** Landing-page closing message and registration action.
- **Variants:** Arabic/RTL and English/LTR.
- **Props:** `copy: HomeContent`; `language: Language`.
- **States:** Static content.
- **Accessibility:** Decorative pattern and arrow are hidden from assistive technology; CTA is a real route link.
- **Do:** Use this CTA to continue the signup journey.
- **Don't:** Route the signup action back to the page top.

## LoginPage

- **Description:** English login form with inline request feedback.
- **Variants:** Idle, submitting, success, and error.
- **Props:** None.
- **States:** Submitting disables repeat requests, exposes `aria-busy`, and shows loading text plus the **NEW** spinner.
- **Accessibility:** Explicit labels, autocomplete, required fields, live status/error feedback, English language metadata, and shared keyboard focus.
- **Do:** Keep errors actionable and the loading state perceivable.
- **Don't:** Submit duplicate requests while one is in progress.

## RegisterPage

- **Description:** English account-registration form with role selection.
- **Variants:** Idle, submitting, success, and error.
- **Props:** None.
- **States:** Submitting disables repeat requests, exposes `aria-busy`, and shows loading text plus the **NEW** spinner.
- **Accessibility:** Explicit labels, field names, autocomplete, required fields, live status/error feedback, English language metadata, and shared keyboard focus.
- **Do:** Keep the role selection required and errors near the form.
- **Don't:** Omit native `name` attributes from form controls.

## ProfilePage

- **Description:** Arabic account summary and role editor.
- **Variants:** Read-only profile; role editing; role update in progress; success or error feedback.
- **Props:** None.
- **States:** Profile/session display, role edit, role submission, update success, and update failure.
- **Accessibility:** Arabic language and RTL metadata, labeled role control, live update feedback, and visible keyboard focus.
- **Do:** Preserve the existing account-update feedback and disable conflicting actions during submission.
- **Don't:** Treat the sidebar's static placeholder items as working navigation.
