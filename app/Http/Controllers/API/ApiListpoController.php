<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Gaji;
use App\Models\User;
use App\Models\Listpo;
use App\Models\Status;
use App\Models\Penjualan;
use Illuminate\Support\Facades\DB;

class ApiListpoController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        //
    }

    public function create($id_penjualan)
    {
        $query_kode_po = Listpo::latest()->first() ?? new listpo();
        $kode_po = 'PO-'. tambah_nol_didepan((int)$query_kode_po->id +1, 6);

        $listpo = new Listpo();
        $listpo->kode_po = $kode_po;
        $listpo->id_user = auth()->id();
        $listpo->id_penjualan = $id_penjualan;
        $listpo->id_statuses = '1';

        $listpo->save();

        // $query_update_status = 

        $penjualan = Penjualan::find($id_penjualan);
        $penjualan->status = 3;
        $penjualan->update();

        return response()->json([
            'status' => true,
            'message' => 'Kirim Pesanan Success'
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
      $assigne = User::where('id', '!=', 1)->pluck('name', 'id')->all();
        $status = Status::all();
        $listpo = Listpo::find($id);
        $user_input = User::where('id', $listpo['id_user'])->pluck('name')->all();

        return response()->json(['list' => $listpo, 'assigne' => $assigne, 'status' => $status, 'user_input' => $user_input]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

       


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
        $listpo = Listpo::find($id);
        $listpo->update($request->all());

        if ($request->id_statuses == 3) {
            $gaji = new Gaji();
            $gaji->id_list_po = $id;
            $gaji->tanggal_selesai = $listpo->updated_at;
            $gaji->harga = 10000;
            $gaji->bonus = 0;
            $gaji->total = $gaji->harga + $gaji->bonus;
            $gaji->save();
        }

        return response()->json('Data berhasil disimpan', 200);
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
