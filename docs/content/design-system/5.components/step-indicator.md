---
title: Step Indicator
description: The Step indicator provides visual feedback to show the user where they are in a process or task, guiding them through a stepped process.
layout: page
label: Core

---

## Usage
The Step indicator shows the user where they are in a process or task.

As sub-tasks are completed, the percentage of completeness progresses to 100%. 

Individual steps are shown as:

- incomplete - the task is available for the user to do
- current - the task has been started
- complete - the task has been completed.

::DocsExample
---
id: 
---
::

### How this component works

#### Linear progression
Steps in a multistep process progress from left to right. 

If used for a task-based process, the user should be allowed to go back to the previous step to review or update their data submission.

Labels for each step of the Step indicator should clearly explain what the user can do at each step. 

#### Current step
The current step keeps the user informed of where they are in the process or task. This helps give them a sense of control, knowing where they have been and what they still need to do.

#### Validation
Validation should be used to confirm that a previous step has been completed. If the user has not completed a task and cannot proceed to the next step, use a Form Alert to tell them why, and what they need to do. 

#### Steps
Steps use colour to display their status. The current step and completed steps, display using the site link colour. Any uncompleted steps use a neutral grey. The current step label displays in bold to add emphasis for the user.

### When and how to use
- Use to support a multi-step process or task.
- Use with clear, concise step labels, including step numbers.
- Use for a process with between 3 and 6 steps.

### When and how not to use
- Don’t use with long or complex labels.
- Don’t use without the current step number and label.
- Don’t use if content is not in sequential order. Consider bullets instead.
- Don’t use with unrelated content.
- Don’t use for a process with less than 3 or more than 6 steps. If more than 6 steps, consider simplifying the process or breaking it up into multiple tasks. 

---

## Theming
Step indicator uses colour to:

- show progress
- highlight interactive states.

::DocsThemeChooser
  ::DocsExample
  ---
  id: 
  ---
  ::
::

To create your own theme see [theming guidance for designers](/design-system/design/theming-guidance-for-designers) or [theming guidance for developers](/design-system/develop/theming).
