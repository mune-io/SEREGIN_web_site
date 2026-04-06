# modules/iam/variables.tf

variable "storage_account_id" {
  description = "Resource ID Storage Account — scope для role assignment"
  type        = string
}

variable "service_principal_object_id" {
  description = "Object ID сервисного принципала GitHub Actions"
  type        = string
  sensitive   = true
}
