package com.example.coronapp.utils

import okhttp3.*
import org.json.JSONArray
import org.json.JSONObject
import java.io.IOException

class APICall {

    private val url = "http://10.0.2.2:8080/"
    private val client = OkHttpClient()
    private var data : JSONObject? = null
    private var dataFor : JSONObject? = null


    companion object {
        private var INSTANCE : APICall? = null

        val instance: APICall
            get() {
                if (INSTANCE == null) {
                    INSTANCE =
                        APICall()
                }
                return INSTANCE!!
        }
    }

    fun getData() : JSONObject? {
        return data
    }

    fun getDataFor() : JSONObject? {
        return dataFor
    }

    fun fetchData() {
        val request = Request.Builder()
            .url(url + "data/all")
            .build()
        client.newCall(request).enqueue(object : Callback {
            override fun onResponse(call : Call, response: Response) {
                if (!response.isSuccessful()) {
                    println("Request failed")
                    return
                } else {
                    val res = JSONObject(response.body()?.string()!!)
                    data = res.getJSONObject("data")
                }
            }

            override fun onFailure(call: Call, e: IOException) {
                println("Bad request : ")
                println(e)
            }
        })
    }

    fun fetchFor(arg : String) {
        val request = Request.Builder()
            .url(url + "data/$arg")
            .build()
        client.newCall(request).enqueue(object : Callback {
            override fun onResponse(call : Call, response: Response) {
                if (!response.isSuccessful()) {
                    println("Request failed")
                    return
                } else {
                    val res = JSONObject(response.body()?.string()!!)
                    dataFor = res.getJSONObject("data")
                }
            }

            override fun onFailure(call: Call, e: IOException) {
                println("Bad request : ")
                println(e)
            }
        })
    }
}