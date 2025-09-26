package config

import (
	"fmt"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

var (
	db *gorm.DB
)

func Connect() {
	fmt.Println("Connecting to database...")
	d, err := gorm.Open("mysql", "nafis:password@23@tcp(127.0.0.1:3306)/simplerest?charset=utf8&parseTime=True&loc=Local")
	if err != nil {
		panic("Failed to connect to database: " + err.Error())
	}
	db = d
	fmt.Println("Database connected successfully.")

}

func GetDb() *gorm.DB {
	return db
}
