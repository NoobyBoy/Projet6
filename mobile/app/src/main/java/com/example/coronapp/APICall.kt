package com.example.coronapp

import okhttp3.*
import java.io.IOException

class APICall {

    private val client = OkHttpClient()
    private val url = "http://10.0.2.2:8080/"

    companion object {
        private var INSTANCE : APICall? = null

        val instance: APICall
            get() {
                if (INSTANCE == null)
                    INSTANCE = APICall()
            return INSTANCE!!
        }
    }

    private fun sendRequest(urlToAdd : String) : Request {
        println("requestt : " + url + urlToAdd)
        return Request.Builder()
            .url(url + urlToAdd)
            .build()
    }


    fun getData() {
        val request = sendRequest("data/all")
        client.newCall(request).enqueue(object : Callback {
            override fun onResponse(call : Call, response: Response) {
                if (!response.isSuccessful()) {
                    println("Request failed")
                    return
                } else {
                    val l = response.body()?.string()!!
                    println("Call")
                    println(l)
                }
            }

            override fun onFailure(call: Call, e: IOException) {
                println("Bad request")
            }

        })
    }
}