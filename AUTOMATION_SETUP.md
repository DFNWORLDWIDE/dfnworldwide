# DFN Worldwide — Automation Setup Guide

> **If you already imported an earlier version of `n8n-workflow.json`:** re-import it. The Normalize Data node had a bug where every contact-form submission recorded its Enquiry Type as the literal word "contact" instead of what the person actually selected (Press, Sponsorship, etc.) — see `KNOWN_ISSUES.md` for the full explanation. The new version also silently drops spam-bot submissions that fill in the hidden `website` honeypot field.

This connects your website to Google Sheets (CRM) and Brevo (email sequences) automatically. Every email signup and every contact form submission flows through this pipeline:

```
Website form → Formspree (backup/notifications) → n8n → Google Sheets + Brevo
```

Formspree is already live at `https://formspree.io/f/maqgbydo` — that part needs no setup. This guide covers the n8n → Sheets → Brevo half.

---

## Step 1 — Import the workflow

1. Go to your n8n cloud instance: `https://dfnworldwide.app.n8n.cloud/home/workflows`
2. Click **Add Workflow** → **Import from File**
3. Upload `n8n-workflow.json` from this folder
4. You'll see 8 connected nodes. Don't activate it yet — three nodes need your credentials first.

## Step 2 — Get your webhook URL live

1. Open the **Website Webhook** node
2. Copy the **Production URL** shown (it will look like `https://dfnworldwide.app.n8n.cloud/webhook/dfn-subscriber`)
3. Open `script.js` in your website files, find `formSubmitTargets` near the top — it's an array with two entries, `formspree` and `n8n`:
   ```javascript
   { name: 'n8n', url: 'https://dfnworldwide.app.n8n.cloud/webhook/dfn-subscriber', headers: { 'Content-Type': 'application/json' } },
   ```
4. Replace the `n8n` entry's `url` with the exact URL n8n gave you if different
5. Re-upload `script.js` to GitHub

## Step 3 — Connect Google Sheets

1. Create a new Google Sheet called **DFN Worldwide CRM**
2. Add two tabs: `Subscribers` and `Contact Enquiries`
3. In `Subscribers`, add header row: `Timestamp | Name | Email | Source | Type`
4. In `Contact Enquiries`, add header row: `Timestamp | Name | Email | Enquiry Type | Subject | Message`
5. Copy the Sheet ID from the URL — it's the long string between `/d/` and `/edit`:
   ```
   https://docs.google.com/spreadsheets/d/THIS_PART_IS_YOUR_SHEET_ID/edit
   ```
6. In n8n, open **Google Sheets — Add Subscriber** node → click the document field → sign in with Google → paste your Sheet ID → select the `Subscribers` tab
7. Repeat for **Google Sheets — Add Enquiry**, selecting the `Contact Enquiries` tab
8. n8n will prompt you to authenticate a Google account the first time — approve it

## Step 4 — Connect Brevo

1. Log into Brevo → go to **Contacts** → **Lists** → create a list called `DFN Movement`
2. Note the **List ID** (shown next to the list name, a number)
3. Go to **SMTP & API** → **API Keys** → generate a new key, copy it
4. In n8n, open **Brevo — Add Contact + Trigger Welcome** node
5. Under Credentials, create a new **HTTP Header Auth** credential:
   - Header Name: `api-key`
   - Header Value: *paste your Brevo API key*
6. In the JSON body field, replace `REPLACE_WITH_YOUR_BREVO_LIST_ID` with your actual list ID number

## Step 5 — Build the welcome sequence in Brevo

1. In Brevo, go to **Automations** → **Create a workflow**
2. Trigger: **Contact added to list** → select `DFN Movement`
3. Add 3 emails:
   - **Email 1** (immediate): Welcome + link to download The Reset System on Gumroad
   - **Email 2** (+2 days): Introduce DFNCHALLENGE EP + the DFN philosophy
   - **Email 3** (+5 days): Introduce the Discipline Tracker app + tease The Rise Experience
4. Activate the automation

Every new contact added by the n8n workflow will now automatically receive this sequence.

## Step 6 — Set up the direct email notification

1. In n8n, open **Email — Notify DFN Team** node
2. Add SMTP credentials — for Gmail:
   - Host: `smtp.gmail.com`
   - Port: `465`
   - User: `dfnworldwide@gmail.com`
   - Password: *use a Gmail App Password, not your regular password* (create one at myaccount.google.com/apppasswords)

## Step 7 — Activate

1. Toggle the workflow **Active** in the top-right of the n8n editor
2. Test it: go to dfnworldwide.com, submit the join form with a test email
3. Check: does the row appear in Google Sheets? Does the contact appear in Brevo? Did you get the notification email?
4. If yes to all three — the pipeline is live.

---

## What happens on every submission

**Email signup (hero or join form):**
Website → Formspree (backup) + n8n → Google Sheets (`Subscribers` tab) + Brevo (added to list, welcome sequence triggers automatically)

**Contact form (press, sponsorship, book, general):**
Website → Formspree (backup) + n8n → Google Sheets (`Contact Enquiries` tab) + direct email to dfnworldwide@gmail.com

---

## Troubleshooting

- **Nothing showing in Sheets:** check the workflow is Active, and check n8n's execution log (left sidebar → Executions) for errors
- **Brevo contact not added:** double check the API key header is exactly `api-key` (lowercase) and the list ID is a number, not text
- **Website shows no error but nothing arrives:** open browser dev tools (F12) → Network tab → resubmit the form → check if the request to your n8n webhook URL returns 200

---

*DFN Worldwide PTY Ltd · Reg. 2026/408693/07*
