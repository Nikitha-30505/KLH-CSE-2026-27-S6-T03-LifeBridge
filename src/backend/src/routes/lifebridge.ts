import { Router, type IRouter } from "express";
import {
  AllocateMatchParams,
  AllocateMatchResponse,
  CreateDemoSessionBody,
  CreateDemoSessionResponse,
  CreateDonorBody,
  CreateDonorResponse,
  CreateOrganBody,
  CreateOrganResponse,
  CreateRecipientBody,
  CreateRecipientResponse,
  GetActivityResponse,
  GetDashboardSummaryResponse,
  ListDonorsQueryParams,
  ListDonorsResponse,
  ListMatchesQueryParams,
  ListMatchesResponse,
  ListNotificationsQueryParams,
  ListNotificationsResponse,
  ListOrgansQueryParams,
  ListOrgansResponse,
  ListRecipientsQueryParams,
  ListRecipientsResponse,
  ListUsersQueryParams,
  ListUsersResponse,
  MarkNotificationReadParams,
  MarkNotificationReadResponse,
  UpdateOrganBody,
  UpdateOrganParams,
  UpdateOrganResponse,
} from "@workspace/api-zod";
import {
  activity,
  donors,
  matches,
  notifications,
  organs,
  recipients,
  summary,
  users,
  type Donor,
  type Organ,
  type Recipient,
} from "../data/lifebridge";

const router: IRouter = Router();
let donorSequence = 1009;
let recipientSequence = 2009;
let organSequence = 5011;

router.get("/dashboard/summary", (_req, res) => {
  res.json(GetDashboardSummaryResponse.parse(summary));
});

router.get("/activity", (_req, res) => {
  res.json(GetActivityResponse.parse(activity));
});

router.get("/users", (req, res) => {
  const query = ListUsersQueryParams.parse(req.query);
  const role = query.role?.toLowerCase();
  const status = query.status?.toLowerCase();
  const result = users.filter((user) => {
    const roleMatches =
      !role ||
      (role === "administrator" && user.role === "System Administrator") ||
      (role === "coordinator" && user.role === "Transplant Coordinator") ||
      (role === "hospital" && user.role === "Hospital Director") ||
      (role === "donor" && user.role === "Donor Services") ||
      (role === "recipient" && user.role === "Recipient Advocate") ||
      user.role.toLowerCase() === role;
    const statusMatches =
      !status ||
      (status === "active" && user.status === "Active") ||
      (status === "inactive" && user.status !== "Active") ||
      user.status.toLowerCase() === status;
    return roleMatches && statusMatches;
  });
  res.json(ListUsersResponse.parse(result));
});

router.get("/donors", (req, res) => {
  const query = ListDonorsQueryParams.parse(req.query);
  const search = query.search?.toLowerCase();
  const status = query.status?.toLowerCase();
  const result = donors.filter((donor) => {
    const haystack = `${donor.displayName} ${donor.id} ${donor.hospital} ${donor.bloodType}`.toLowerCase();
    const statusMatches =
      !status ||
      (status === "active" && donor.status === "Medically cleared") ||
      (status === "pending" && ["In review", "Pending labs"].includes(donor.status)) ||
      (status === "cleared" && donor.status === "Medically cleared") ||
      donor.status.toLowerCase() === status;
    return (
      (!search || haystack.includes(search)) &&
      statusMatches
    );
  });
  res.json(ListDonorsResponse.parse(result));
});

router.post("/donors", (req, res) => {
  const body = CreateDonorBody.parse(req.body);
  const donor: Donor = {
    id: `don-${donorSequence++}`,
    displayName: body.displayName,
    bloodType: body.bloodType,
    age: body.age,
    organs: body.organs,
    status: "In review",
    registeredAt: new Date().toISOString(),
    hospital: body.hospital,
    consent: body.consent ?? "Consent pending",
    riskFlags: [],
  };
  donors.unshift(donor);
  res.status(201).json(CreateDonorResponse.parse(donor));
});

router.get("/recipients", (req, res) => {
  const query = ListRecipientsQueryParams.parse(req.query);
  const search = query.search?.toLowerCase();
  const urgency = query.urgency?.toLowerCase();
  const result = recipients.filter((recipient) => {
    const haystack = `${recipient.displayName} ${recipient.id} ${recipient.hospital} ${recipient.organNeeded}`.toLowerCase();
    return (
      (!search || haystack.includes(search)) &&
      (!urgency || recipient.urgency.toLowerCase() === urgency)
    );
  });
  res.json(ListRecipientsResponse.parse(result));
});

router.post("/recipients", (req, res) => {
  const body = CreateRecipientBody.parse(req.body);
  const recipient: Recipient = {
    id: `rec-${recipientSequence++}`,
    displayName: body.displayName,
    bloodType: body.bloodType,
    age: body.age,
    organNeeded: body.organNeeded,
    urgency: body.urgency,
    status: "Active waitlist",
    hospital: body.hospital,
    waitDays: 0,
    pra: 0,
    hlaSummary: "Pending tissue typing",
    medicalCondition: body.medicalCondition,
  };
  recipients.unshift(recipient);
  res.status(201).json(CreateRecipientResponse.parse(recipient));
});

router.get("/organs", (req, res) => {
  const query = ListOrgansQueryParams.parse(req.query);
  const organType = query.organType?.toLowerCase();
  const status = query.status?.toLowerCase();
  const search = query.search?.toLowerCase();
  const result = organs.filter((organ) => {
    const haystack = `${organ.id} ${organ.donorId} ${organ.sourceHospital} ${organ.destination}`.toLowerCase();
    return (
      (!organType ||
        organ.organType.toLowerCase() === organType ||
        (organType === "lung" && organ.organType === "lungs")) &&
      (!status || organ.status.toLowerCase() === status) &&
      (!search || haystack.includes(search))
    );
  });
  res.json(ListOrgansResponse.parse(result));
});

router.post("/organs", (req, res) => {
  const body = CreateOrganBody.parse(req.body);
  const organ: Organ = {
    id: `org-${organSequence++}`,
    organType: body.organType,
    bloodType: body.bloodType,
    donorId: body.donorId,
    donorAge: body.donorAge,
    sourceHospital: body.sourceHospital,
    status: "Available",
    preservationMinutes: body.preservationMinutes,
    maxPreservationMinutes: body.maxPreservationMinutes,
    hlaSummary: body.hlaSummary,
    infectiousRisk: body.infectiousRisk ?? "Standard",
    availableAt: new Date().toISOString(),
    destination: body.destination ?? "Unassigned",
  };
  organs.unshift(organ);
  res.status(201).json(CreateOrganResponse.parse(organ));
});

router.patch("/organs/:id", (req, res) => {
  const params = UpdateOrganParams.parse(req.params);
  const body = UpdateOrganBody.parse(req.body);
  const organ = organs.find((item) => item.id === params.id);
  if (!organ) {
    res.status(404).json({ error: "Organ not found" });
    return;
  }
  if (body.status !== undefined) organ.status = body.status;
  if (body.destination !== undefined) organ.destination = body.destination;
  if (body.preservationMinutes !== undefined) {
    organ.preservationMinutes = body.preservationMinutes;
  }
  res.json(UpdateOrganResponse.parse(organ));
});

router.get("/matches", (req, res) => {
  const query = ListMatchesQueryParams.parse(req.query);
  const organType = query.organType?.toLowerCase();
  const status = query.status?.toLowerCase();
  const result = matches.filter(
    (match) =>
      (!organType ||
        match.organType.toLowerCase() === organType ||
        (organType === "lung" && match.organType === "lungs")) &&
      (!status ||
        (status === "pending" && match.status !== "Allocated") ||
        (status === "allocated" && match.status === "Allocated") ||
        match.status.toLowerCase() === status),
  );
  res.json(ListMatchesResponse.parse(result));
});

router.post("/matches/:id/allocate", (req, res) => {
  const params = AllocateMatchParams.parse(req.params);
  const match = matches.find((item) => item.id === params.id);
  if (!match) {
    res.status(404).json({ error: "Match not found" });
    return;
  }
  match.status = "Allocated";
  const organ = organs.find((item) => item.id === match.organId);
  if (organ) {
    organ.status = "Allocated";
    organ.destination = match.recipientHospital;
  }
  res.json(AllocateMatchResponse.parse(match));
});

router.get("/notifications", (req, res) => {
  const query = ListNotificationsQueryParams.parse(req.query);
  const result = query.unreadOnly
    ? notifications.filter((notification) => !notification.read)
    : notifications;
  res.json(ListNotificationsResponse.parse(result));
});

router.patch("/notifications/:id/read", (req, res) => {
  const params = MarkNotificationReadParams.parse(req.params);
  const notification = notifications.find((item) => item.id === params.id);
  if (!notification) {
    res.status(404).json({ error: "Notification not found" });
    return;
  }
  notification.read = true;
  res.json(MarkNotificationReadResponse.parse(notification));
});

router.post("/auth/demo-session", (req, res) => {
  const body = CreateDemoSessionBody.parse(req.body);
  const user = users.find((item) => item.id === body.userId);
  if (!user) {
    res.status(404).json({ error: "Demo persona not found" });
    return;
  }
  res.json(
    CreateDemoSessionResponse.parse({
      sessionId: `demo-${user.id}`,
      user,
      expiresAt: "2026-09-23T00:00:00Z",
    }),
  );
});

export default router;