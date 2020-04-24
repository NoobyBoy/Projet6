package com.example.coronapp

class ListDto {
    var country: String = ""
    var name: String = ""
    var nb: Int = 0

    constructor(country: String, name: String, nb: Int) {
        this.country = country
        this.name = name
        this.nb = nb
    }
}