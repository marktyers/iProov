
# iProov Web SDK Technical Evaluation

> September 2023, this works on Safari as well as Chrome

This is the first iteration of the solution. Needs more work to improve code quality and performance.

Proof of concept only.

Most of the help came from the Mozilla Developer Network website.

Getting a list of cameras and connecting. Displaying a live video feed.

Used a simple function to start the video stream.

Toggling the black/white background sequence defined in an array of numbers. 
Each loop removes the first index from this.

Capturing the images.

Already knew how to draw an image from the live feed inside a canvas. Not strictly required so 
decided to hide this element.

Canvas really powerful and simple to convert this into a data URL base64-encoded.

Final step to create an img element using this DataURL as its src and appending to the page.
Not supposed to be showing the images until the end of the script so hid this section.

## Repeating Action

Probably a more elegant approach but standard JS tools will suffice.

Using the standard `setInterval()` method will callback. Do an initial capture then repeat every 500ms.

Use a `setTimeout()` callback to cancel the `setInterval()`

At the end of the script we need to hide all the elements and show the 20 images.

# DevOps Questions

## Could you briefly explain how multistage docker builds work, and give an example of a scenario in which it would be useful?

Breaks the building of the docker image into separate stages. Data can be passed from one stage to the next. Anything not needed can be ignored so it produces leaner and more secure docker images. Can speed up build (with BuildKit) as images from previous stages can be copied in.

Useful for debugging (have different debugging and production stages).

## Could you describe how you would set up a system for running tests automatically whenever new commits are made in a pull request?

Configure the CI/CD workflow to trigger the tests based on the git or Github events (eg push, pull_request).

Specify the branch this is to be triggered on.

The workflow runs when a pull request is opened or reopened or when the head branch of the pull request is updated

Need to specify the branch the pr is being merged into (typically master or main).

Example using github actions:

```yaml
name: My Pipeline

on:
  pull_request:
    branches:
      - master
```

## If you have a k8s cluster with a service that handles user auth, how could you leverage it at the cluster level to ensure that requests to other services can’t be made by non-authed users?

Start with a Kubernetes cluster, which includes nodes (worker machines) and a control plane for cluster orchestration. Deploy a user authentication service with a database to store user information.

Start by deploying a user authentication service in the Kubernetes cluster and use Role-Based Access Control (RBAC) for managing permissions and define RBAC rules to control access to various resources, including services and pods. Create custom RBAC roles and authorised users should be issued a JWT which should contain user identity and group information.
Implement authentication and authorization checks on the endpoints. Verify token and extract credentials.
Implement authorization checks based on the user's identity and use the RBAC rules to check if the user has permissions to access a resource. Finally log all resource requests.
