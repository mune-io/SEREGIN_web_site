# modules/cdn/variables.tf

variable "project_name" {
  description = "Базовое имя проекта"
  type        = string
}

variable "location" {
  description = "Azure-регион (CDN profile создаётся в том же регионе)"
  type        = string
}

variable "environment" {
  description = "Окружение (prod / staging / dev)"
  type        = string
}

variable "resource_group_name" {
  description = "Имя Resource Group, в которой создаётся CDN (из модуля storage)"
  type        = string
}

variable "storage_web_endpoint" {
  description = "Hostname Storage static website origin (без https://, без trailing slash)"
  type        = string
}
