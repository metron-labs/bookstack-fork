<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

BookStack\Facades\Theme::listen('app_boot', function () {
    
    Route::post('/ajax/training-complete', function (Request $request) {

        if (!$request->has(['page_name', 'page_url'])) {
            return response()->json(['status' => 'error', 'message' => 'Missing data'], 400);
        }
        
        $webhookUrl = config('services.slack.webhook_url') ?: env('SLACK_WEBHOOK_URL');

        if (!$webhookUrl) {
            return response()->json(['status' => 'error', 'message' => 'Webhook missing'], 500);
        }

        $payload = [
            "text" => ":blue_book: *Training Completed!* :blue_book:\n" .
                      "*User:* " . auth()->user()->name . "\n" .
                      "*Page:* <" . $request->page_url . "|" . $request->page_name . ">\n" .
                      "*Time:* " . now()->setTimezone('Asia/Kolkata')->format('Y-m-d h:i:s A')
        ];

        $response = Http::post($webhookUrl, $payload);

        return response()->json(['status' => $response->successful() ? 'ok' : 'error']);
    })->middleware(['web', 'auth']);
    
});
