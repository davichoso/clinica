<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Day;
use DB;

class CalendarController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $days = \App\Models\Day::get();

        $jdays=[];
        foreach($days as $day)
        {
            $day =explode("-",$day->dia);
            $jdays[] = $day[0]."-".intval($day[1])."-".intval($day[2]) ;
        }
      //  $jdays = implode(",",$jdays);
        return response()->json([
          'msg'=>"Success",
          'days'=> $jdays
        ],200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
         $day = new Day;
         DB::statement('delete from days;');
         DB::statement('commit;');
         
         $data= [];
         $calendar = $request->input('calendar');
         
         foreach ( $calendar as $d )
         {
          $data[]=array('day'=>$d);
         }   
           $day->insert($data);    
         
       /**aca deberia llamar al index***/
       
       $days = \App\Models\Day::get();

        $jdays=[];
        foreach($days as $day)
        {
            $day =explode("-",$day->dia);
            $jdays[] = $day[0]."-".intval($day[1])."-".intval($day[2]) ;
        }
      //  $jdays = implode(",",$jdays);
        return response()->json([
          'msg'=>"Success",
          'days'=> $jdays
        ],200);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getYearMonth(Request $request)
    {
        $año=intval($request->input('year'));
        $mes=intval($request->input('month'));
        $day = new Day;
        $days = $day::whereRaw("YEAR(dia) = $año AND MONTH(dia) = $mes")->take(10)->get();

        foreach($days as $day)
        {
            $day =explode("-",$day->dia);
            $jdays[] = $day[0]."-".intval($day[1])."-".intval($day[2]) ;
        }


        return response()->json([
            'msg'=>"Success",
            'days'=> $jdays
        ],200);


    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
