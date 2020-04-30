package com.example.coronapp.utils

import okhttp3.*
import org.json.JSONArray
import org.json.JSONObject
import java.io.IOException

class APICall {

    private val url = "http://192.168.0.29:8080/"
    private val client = OkHttpClient()
    private var data : JSONObject? = null
    private var dataFor : JSONObject? = null
    private var graph : JSONObject? = null
    private var date : String? = null

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


    fun getGraph() : JSONObject? {
        return graph
    }

    fun setDate(string: String) {
        date = string;
        fetchData()
    }

    fun getDate() : String {
        return date!!
    }

    private fun makeRequest(urlToAdd : String) : Request {
        return Request.Builder()
            .url(url + urlToAdd)
            .build()
    }

    private fun fetchData() {
        val request = makeRequest("data/all?date=" + date!!)
        data = null;
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
        val request = makeRequest("data/$arg")
        client.newCall(request).enqueue(object : Callback {
            override fun onResponse(call : Call, response: Response) {
                if (!response.isSuccessful()) {
                    println("Request failed")
                    val res = JSONObject(response.body()?.string()!!)
                    println(res)
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


    fun graphData() {
        val request = makeRequest("data/graph")
        client.newCall(request).enqueue(object : Callback {
            override fun onResponse(call : Call, response: Response) {
                if (!response.isSuccessful()) {
                    println("Request failed")
                    println(response)
                    return
                } else {
                    val res = JSONObject(response.body()?.string()!!)
                    graph = res.getJSONObject("data")
                    println(graph)
                }
            }

            override fun onFailure(call: Call, e: IOException) {
                println("Bad request : ")
                println(e)
            }
        })
    }
}