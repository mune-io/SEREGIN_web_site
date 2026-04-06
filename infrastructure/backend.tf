# infrastructure/backend.tf
# Удалённое хранилище tfstate в Azure Blob Storage
#
# КАК ВКЛЮЧИТЬ:
#   1. Создайте отдельный Storage Account для tfstate (один раз вручную или скриптом):
#
#      az group create -n rg-tfstate -l westeurope
#      az storage account create -n sereginweb tfstate -g rg-tfstate --sku Standard_LRS
#      az storage container create -n tfstate --account-name sereginwebtfstate
#
#   2. Раскомментируйте блок terraform {} ниже.
#   3. Запустите: terraform init
#
# ВАЖНО: storage_account_name должен быть глобально уникальным (3-24 символа, только строчные + цифры)

/*
terraform {
  backend "azurerm" {
    resource_group_name  = "rg-tfstate"
    storage_account_name = "seregin-website"   # <-- замените на своё уникальное имя
    container_name       = "tfstate"
    key                  = "seregin-website.prod.tfstate"
  }
}
*/

# Пока backend не включён — tfstate хранится локально (файл terraform.tfstate).
# Не коммитьте его в git! Добавьте в .gitignore:
#   *.tfstate
#   *.tfstate.backup
