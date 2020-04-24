package com.example.coronapp.ui.tested

import android.app.Activity
import android.content.Context
import android.graphics.Color
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.BaseAdapter
import android.widget.TextView
import com.example.coronapp.R
import com.example.coronapp.ListDto

class TestedListAdapter(private var activity: Activity, private var items: ArrayList<ListDto>, private var hospitalized: Boolean) : BaseAdapter() {


        private class ViewHolder(row: View?) {
            var txtName: TextView? = null;
            var txtNb: TextView? = null;
            var txt: TextView? = null;

            init {
                this.txtName = row?.findViewById(R.id.listName)
                this.txtNb = row?.findViewById(R.id.listNb)
                this.txt = row?.findViewById(R.id.list)
            }
        }

        override fun getView(position: Int, convertView: View?, parent: ViewGroup?): View {
            val view: View?
            val viewHolder: ViewHolder

            if (convertView == null) {
                var inflater = activity?.getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
                view = inflater.inflate(R.layout.tested_list_row, null)
                viewHolder =
                    ViewHolder(
                        view
                    )
                view?.tag = viewHolder
            } else {
                view = convertView
                viewHolder = view.tag as ViewHolder
            }

            var listDeathDto = items[position]
            viewHolder.txtName?.text = listDeathDto.name
            viewHolder.txtNb?.text = listDeathDto.nb.toString()
            if (hospitalized) {
                viewHolder.txtName?.setTextColor(Color.WHITE)
                viewHolder.txtNb?.setTextColor(Color.LTGRAY)
                viewHolder.txt?.setTextColor(Color.LTGRAY)
                viewHolder.txt?.text = "hospitalized"
            }

            return view as View
        }

        override fun getItem(position: Int): Any {
            return items[position]
        }

        override fun getItemId(position: Int): Long {
            return position.toLong()
        }

        override fun getCount(): Int {
            return items.size
        }
}