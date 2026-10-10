<!--
TEMPLATE: cron-jobs.md
- {{...}} are placeholders to fill in. Remove all comments when generating the doc.
- Schedule: cron expression + explanation + timezone (taken from config, not assumed).
- Write according to convention.md.
-->
# Cron jobs

| Name | Schedule | Description | Data changed |
|---|---|---|---|
| [`{{SendReminderMail}}`](#{{sendremindermail}}) | `{{0 9 * * *}}`<br>{{daily at 9:00 (GMT+7)}} | {{Send a reminder mail to users with incomplete profiles}} | Update: {{reminder time}} ([`{{users.reminded_at}}`](database.md#{{users}})) |

<!-- Each cron job with complex logic gets its own section, written like the Processing logic section in templates/screen.md. -->

## {{SendReminderMail}}

**Processing conditions:**
Must satisfy the conditions below:
* {{condition 1}}
* {{condition 2}}

**Steps:**
1. {{...}}

**Errors:**
* {{error case}} → {{handling}}

## Sources

* `{{path of the file registering the schedule}}`
* `{{path of the handler file of each job}}`
