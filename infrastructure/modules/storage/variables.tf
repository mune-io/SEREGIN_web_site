# modules/storage/variables.tf

variable "project_name" {
  description = "Базовое имя проекта"
  type        = string
}

variable "location" {
  description = "Azure-регион"
  type        = string
}

variable "environment" {
  description = "Окружение (prod / staging / dev)"
  type        = string
}
